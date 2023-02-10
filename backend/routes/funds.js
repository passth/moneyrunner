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
  let investorClosing = null;

  if (!fund) {
    return res.status(404);
  }

  if (fund?.subscriptionId) {
    return res.status(200).json(fund);
  }

  try {
    investorClosing = await services.passthrough.createInvestorClosing({
      fundId: fund.passthroughFundId,
      closingId: fund.passthroughClosingId,
      user: req.user,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error creating investor closing' });
  }

  try {
    await services.passthrough.sendInvestorClosing({
      fundId: fund.passthroughFundId,
      closingId: fund.passthroughClosingId,
      investorClosingId: investorClosing.id,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error sending investor closing' });
  }

  try {
    await services.funds.createSubscription({
      fundId: fund.id,
      userId: req.user.id,
      investorClosingId: investorClosing.id,
      invitationUrl: investorClosing.collaborators[0].sign_in_url,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error creating subscription' });
  }

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
