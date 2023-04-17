import { Router } from "express";
import * as services from "./services";
import * as middlewares from "./middlewares";
import * as passthrough from "./passthrough";

const router = Router();

/**
 * Auth endpoints
 */

/* Generate auth uri */
router.post("/auth/login", async (req, res) => {
  const authUri = await services.generateAuthUri();
  return res.status(200).json({ authUri });
});

router.get("/auth/logout", middlewares.authenticate, (req: any, res: any) => {
  res.clearCookie("jwt");
  return res.status(200).json({ message: "Logged out" });
});

/* Verify token and set it to cookies */
router.get("/auth/redirect/", async (req: any, res) => {
  const user = await services.authenticate(String(req.query?.code));

  if (!user) {
    console.log("Could not authenticate.");
    return res.redirect(301, "/");
  }

  req.session.userId = user.id;
  return res.redirect(301, "/");
});

/* Returns current user information */
router.get("/auth/me", middlewares.authenticate, async (req: any, res: any) =>
  res.status(200).json(req.user)
);

/**
 * Fund endpoints
 */

/* List funds with subscriptions */
router.get("/funds", middlewares.authenticate, async (req: any, res: any) => {
  const funds = await services.getFunds(req.user.id);
  return res.json(funds);
});

/* Retrieve a single fund with an active subscription */
router.get("/funds/:fundId", middlewares.authenticate, async (req: any, res: any) => {
  const fundId = parseInt(req.params.fundId, 10);
  const fund = await services.getFundById(req.user.id, fundId);

  if (!fund || !fund?.subscriptionId) {
    return res.status(404);
  }

  return res.json(fund);
});

/**
 * Subscription endpoints
 */

/* Create a subscription to a fund */
router.post("/funds/:fundId", middlewares.authenticate, async (req: any, res: any) => {
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
});

/* Move a subscription status to signed, called when everything is completed */
router.post("/funds/:fundId/complete", middlewares.authenticate, async (req: any, res: any) => {
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
});

/**
 * Passthrough endpoints
 */

/* Create a passthrough session for the SDK */
router.post(
  "/funds/:fundId/get-passthrough-session",
  middlewares.authenticate,
  async (req: any, res: any) => {
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
router.post("/passthrough-callback", async (req: any, res: any) => {
  const { event_type: eventType, data } = req.body;

  if (eventType === "investor-closing-status-change") {
    await services.updatePassthroughStatus(data.investor_closing.id, data.investor_closing.status);
  }

  return res.status(204).json({});
});

export default router;
