const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.PASSTHROUGH_BASE_URL,
  headers: { "Authorization": `Bearer ${process.env.PASSTHROUGH_API_KEY}` }
});


async function createInvestorClosing({
  fundId,
  closingId,
  user,
}) {
  const url = `/funds/${fundId}/fund-closings/${closingId}/investor-closings/`;
  const response = await instance.post(url, {
    "investor_closings": [{
      "investor_name": user.name,
      "collaborators": [{ email: user.email }],
    }]
  });
  return response.data.investor_closings[0];
}

function sendInvestorClosing({
  fundId,
  closingId,
  investorClosingId,
}) {
  const url = `/funds/${fundId}/fund-closings/${closingId}/investor-closings/send/`;
  return instance.post(url, {
    "investor_closing_ids": [investorClosingId],
    "send_emails": false,
  });
};

function createEmbeddedSession({
  fundId,
  closingId,
  investorClosingId,
  user,
}) {
  const url = `/funds/${fundId}/fund-closings/${closingId}/investor-closings/${investorClosingId}/create-session/`;
  return instance.post(url, { user_email: user.email });
}

module.exports = {
  createInvestorClosing,
  sendInvestorClosing,
  createEmbeddedSession,
}
