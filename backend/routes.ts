import { Router } from "express";
import * as services from "./services";
import * as middlewares from "./middlewares";
import * as passthrough from "./passthrough";
import * as types from "./types";

const router = Router();

/**
 * Auth endpoints
 */

/* Login */
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const token = await services.authenticateUser(email, password);

  if (!token) {
    return res.status(400).json({
      error: "User does not exist or password is incorret.",
    });
  }

  return res.status(200).json({ token });
});

/**
 * Fund endpoints
 */

/* List funds with subscriptions */
router.get(
  "/funds",
  middlewares.authenticate,
  async (req: types.RequestType, res: types.ResponseType) => {
    const funds = await services.getFunds(req.user.id);
    return res.json(funds);
  }
);

/* Retrieve a single fund with an active subscription */
router.get(
  "/funds/:fundId",
  middlewares.authenticate,
  async (req: types.RequestType, res: types.ResponseType) => {
    const fundId = parseInt(req.params.fundId, 10);
    const fund = await services.getFundById(req.user.id, fundId);

    if (!fund || !fund?.subscriptionId) {
      return res.status(404);
    }

    return res.json(fund);
  }
);

/**
 * Subscription endpoints
 */

/* Create a subscription to a fund */
router.post(
  "/funds/:fundId",
  middlewares.authenticate,
  async (req: types.RequestType, res: types.ResponseType) => {
    const fundId = parseInt(req.params.fundId, 10);
    const fund = await services.getFundById(req.user.id, fundId);
    let investorClosing: passthrough.InvestorClosingType = null;

    if (!fund) {
      return res.status(404);
    }

    if (fund?.subscriptionId) {
      return res.status(200).json(fund);
    }

    try {
      investorClosing = await passthrough.createInvestorClosing(
        fund.passthroughFundId,
        fund.passthroughClosingId,
        req.user
      );
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Error creating investor closing" });
    }

    try {
      await passthrough.sendInvestorClosing(
        fund.passthroughFundId,
        fund.passthroughClosingId,
        investorClosing.id
      );
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Error sending investor closing" });
    }

    try {
      await services.createSubscription(
        fund.id,
        req.user.id,
        investorClosing.id,
        investorClosing.collaborators[0].sign_in_url
      );
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Error creating subscription" });
    }

    const updatedFund = await services.getFundById(req.user.id, fundId);
    return res.status(201).json(updatedFund);
  }
);

/* Move a subscription status to signed, called when everything is completed */
router.post(
  "/funds/:fundId/complete",
  middlewares.authenticate,
  async (req: types.RequestType, res: types.ResponseType) => {
    const fundId = parseInt(req.params.fundId, 10);
    const fund = await services.getFundById(req.user.id, fundId);

    if (!fund || !fund?.subscriptionId) {
      return res.status(404);
    }

    await services.updateSubscription({
      id: fund.subscriptionId,
      status: "signed",
    });

    return res.status(200).json({ message: "Subscription completed" });
  }
);

/**
 * Passthrough endpoints
 */

/* Create a passthrough session for the SDK */
router.post(
  "/funds/:fundId/get-passthrough-session",
  middlewares.authenticate,
  async (req: types.RequestType, res: types.ResponseType) => {
    const fundId = parseInt(req.params.fundId, 10);
    const fund = await services.getFundById(req.user.id, fundId);

    if (!fund || !fund?.subscriptionPassthroughInvestorClosingId) {
      return res.status(404);
    }

    const response = await passthrough.createEmbeddedSession(
      fund.passthroughFundId,
      fund.passthroughClosingId,
      fund.subscriptionPassthroughInvestorClosingId,
      req.user
    );

    return res.status(201).json({ token: response.data.token });
  }
);

/* Listen to passthrough webhooks */
router.post("/passthrough-callback", async (req: types.RequestType, res: types.ResponseType) => {
  const { event_type: eventType, data } = req.body;

  if (eventType === "investor-closing-status-change") {
    await services.updatePassthroughStatus(data.investor_closing.id, data.investor_closing.status);
  }

  return res.status(204).json({});
});

export default router;
