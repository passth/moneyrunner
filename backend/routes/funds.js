const express = require('express');
const services = require('../services');
const router = express.Router();

router.get('/', async function (req, res) {
  const funds = await services.funds.getFunds(req.user.id);
  return res.json(funds);
});

router.get('/:fundId', async function (req, res) {
  const fundId = parseInt(req.params.fundId);
  const fund = await services.funds.getFundById(req.user.id, fundId);

  if (!fund || !fund?.subscriptionId) {
    return res.status(404);
  }

  return res.json(fund);
});

router.post('/:fundId', async function (req, res) {
  const fundId = parseInt(req.params.fundId);
  const fund = await services.funds.getFundById(req.user.id, fundId);

  if (!fund) {
    return res.status(404);
  }

  if (fund?.subscriptionId) {
    return res.status(200).json(fund);
  }

  const data = await services.passthrough.createInvestorClosing({
    fundId: fund.passthroughFundId,
    closingId: fund.passthroughClosingId,
    user: req.user,
  });

  await services.passthrough.sendInvestorClosing({
    fundId: fund.passthroughFundId,
    closingId: fund.passthroughClosingId,
    investorClosingId: data.id,
  });

  await services.funds.createSubscription({
    fundId: fund.id,
    userId: req.user.id,
    investorClosingId: data.id,
    invitationUrl: data.collaborators[0].sign_in_url,
  });

  const updatedFund = await services.funds.getFundById(req.user.id, fundId);
  return res.status(201).json(updatedFund);
});

router.post('/:fundId/get-passthrough-session', async function (req, res) {
  const fundId = parseInt(req.params.fundId);
  const fund = await services.funds.getFundById(req.user.id, fundId);

  if (!fund || !fund?.subscriptionPassthroughInvestorClosingId) {
    return res.status(404);
  }

  const response = await services.passthrough.createEmbeddedSession({
    fundId: fund.passthroughFundId,
    closingId: fund.passthroughClosingId,
    investorClosingId: fund.subscriptionPassthroughInvestorClosingId,
    user: req.user,
  });

  return res.status(201).json({ token: response.data.token });
});

module.exports = router;
