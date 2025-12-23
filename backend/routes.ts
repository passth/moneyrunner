import { Router } from "express";
import * as services from "./services";
import * as middlewares from "./middlewares";
import { PassthroughClient, InvestorClosing, Fund } from "./passthrough";
import { validateUUID } from "./validators";

const router = Router();

/* Generate auth uri */
router.post("/auth/login", async (req, res) => {
  // If test mode is enabled, login with admin
  if (process.env.TEST_MODE) {
    const user = await services.getOrCreateUser({ email: "admin@example.com", name: "Tony Stark" });
    // @ts-ignore
    req.session.userId = user.id;
    return res.status(200).json({ authUri: "/" });
  }

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

/** List funds */
router.get("/funds", middlewares.authenticate, async (req: any, res: any) => {
  const sessionSettings = req.session.settings || {};
  const passthrough = new PassthroughClient(sessionSettings.apiKey, sessionSettings.baseUrl);
  let funds: Fund[];

  try {
    funds = await passthrough.listFunds();
  } catch (e) {
    console.error("Error fetching funds:", e);
    return res.json([]);
  }

  return res.json(funds.filter((f) => f.is_live));
});

/** Get a single fund */
router.get("/funds/:fundId", middlewares.authenticate, async (req: any, res: any) => {
  if (!validateUUID(req.params.fundId)) {
    return res.status(404).json({ message: "Not found" });
  }

  const sessionSettings = req.session.settings || {};
  const passthrough = new PassthroughClient(sessionSettings.apiKey, sessionSettings.baseUrl);
  let funds: Fund[];

  try {
    funds = await passthrough.listFunds();
  } catch (e) {
    console.error("Error fetching funds:", e);
    return res.status(404);
  }

  const fund = funds.filter((f) => f.is_live).find((f) => f.id === req.params.fundId);

  if (!fund) {
    return res.status(404);
  }

  return res.json(fund);
});

/** Lists subscriptions */
router.get("/funds/:fundId/subscriptions", middlewares.authenticate, async (req: any, res: any) => {
  if (!validateUUID(req.params.fundId)) {
    return res.status(404).json({ message: "Not found" });
  }

  const sessionSettings = req.session.settings || {};
  const passthrough = new PassthroughClient(sessionSettings.apiKey, sessionSettings.baseUrl);
  let subscriptions: InvestorClosing[];

  try {
    subscriptions = await passthrough.listInvestorClosings(req.params.fundId, req.user.email);
  } catch (e) {
    console.error("Error fetching subscriptions:", e);
    return res.json([]);
  }

  const result = subscriptions
    .filter((s) => s.status !== "unsent")
    .sort((a, b) => a.investor_name.localeCompare(b.investor_name));
  return res.json(result);
});

/** Get subscription */
router.get("/subscriptions/:id", middlewares.authenticate, async (req: any, res: any) => {
  if (!validateUUID(req.params.id)) {
    return res.status(404).json({ message: "Not found" });
  }

  const sessionSettings = req.session.settings || {};
  const passthrough = new PassthroughClient(sessionSettings.apiKey, sessionSettings.baseUrl);
  let subscription: InvestorClosing;

  try {
    subscription = await passthrough.getInvestorClosing(req.params.id);
  } catch (e) {
    console.error("Error fetching subscription:", e);
    return res.status(404).json({ message: "Not found" });
  }

  let token = null;

  if (!subscription) {
    return res.status(404).json({ message: "Subscription not found" });
  }

  const inProgressStatuses = ["sent", "in_progress", "requested_changes"];
  const needsAttention = inProgressStatuses.includes(subscription.status);
  const isNextSigner =
    subscription.status === "partially_signed" &&
    subscription?.next_signer?.email === req.user.email;
  const shouldGenerateToken = needsAttention || isNextSigner;

  if (shouldGenerateToken) {
    try {
      token = await passthrough.createEmbeddedSession(
        subscription.fund_closing.fund.id,
        subscription.fund_closing.id,
        subscription.id,
        req.user
      );
    } catch (e) {
      console.error("Error creating embedded session:", e);
    }
  }

  return res.json({
    subscription,
    token,
  });
});

/** Create subscription */
router.post("/subscriptions", middlewares.authenticate, async (req: any, res: any) => {
  const { fundId, legalName } = req.body;

  if (!validateUUID(fundId)) {
    return res.status(404).json({ message: "Not found" });
  }

  const sessionSettings = req.session.settings || {};
  const passthrough = new PassthroughClient(sessionSettings.apiKey, sessionSettings.baseUrl);

  try {
    const subscription = await passthrough.createInvestorClosing(fundId, req.user, legalName);
    await passthrough.sendInvestorClosing(fundId, subscription.fund_closing.id, subscription.id);
    return res.json({ id: subscription.id });
  } catch (e) {
    console.error("Error creating subscription:", e);
    return res.status(404).json({ message: "Not found" });
  }
});

/** Get settings */
router.get("/settings", middlewares.authenticate, async (req: any, res: any) => {
  const sessionSettings = req.session.settings || {};
  return res.json({
    baseUrl: sessionSettings.baseUrl || process.env.PASSTHROUGH_BASE_URL || null,
  });
});

/** Update settings */
router.patch("/settings", middlewares.authenticate, async (req: any, res: any) => {
  const { baseUrl, apiKey } = req.body;

  if (!req.session.settings) {
    req.session.settings = {};
  }

  if (baseUrl !== undefined) {
    req.session.settings.baseUrl = baseUrl;
  }

  if (apiKey !== undefined) {
    req.session.settings.apiKey = apiKey;
  }

  return res.json({ message: "Settings updated successfully" });
});

export default router;
