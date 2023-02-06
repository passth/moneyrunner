const knex = require('../db').knex;
const { funds, subscriptions } = require('../db');

function getFunds(userId, where = {}) {
  return funds()
    .select(
      'funds.id',
      'funds.name',
      'funds.size',
      'funds.passthroughFundId',
      'funds.passthroughClosingId',
      'subscriptions.id as subscriptionId',
      'subscriptions.isActive as subscriptionIsActive',
      'subscriptions.passthroughInvestorClosingId as subscriptionPassthroughInvestorClosingId',
      'subscriptions.passthroughInvitationUrl as subscriptionPassthroughInvitationUrl',
    )
    .leftJoin(
      knex
        .select(
          'id',
          'userId',
          'fundId',
          'isActive',
          'passthroughInvestorClosingId',
          'passthroughInvitationUrl',
        )
        .from('subscriptions')
        .where({ isActive: true, userId })
        .as('subscriptions'),
      'funds.id',
      'subscriptions.fundId'
    )
    .where(where);
}

function getFundById(userId, fundId) {
  return getFunds(userId, { 'funds.id': fundId }).first();
}

function createSubscription({ fundId, userId, investorClosingId, invitationUrl }) {
  return subscriptions().insert({
    fundId,
    userId,
    passthroughInvestorClosingId: investorClosingId,
    passthroughInvitationUrl: invitationUrl,
    isActive: true,
  });
}

module.exports = {
  getFunds,
  getFundById,
  createSubscription,
}
