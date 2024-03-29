import { funds, subscriptions, users, knex } from "./db";
import * as types from "./types";
import * as google from "./google";

/**
 * Authentication methods
 * */

export function getUserByEmail(email: string) {
  return users().where({ email }).select().first();
}

export function getUserById(id: number) {
  return users().where({ id }).select().first();
}

export function generateAuthUri() {
  return google.generateAuthUri();
}

export async function getOrCreateUser(userData: { name: string; email: string }) {
  let user = await getUserByEmail(userData.email);

  if (!user) {
    [user] = await users().insert(userData).returning("*");
  }

  return user;
}

export async function authenticate(code: string): Promise<types.UserType | null> {
  const userData = await google.fetchUserData(code);

  if (!userData) {
    return null;
  }

  return getOrCreateUser(userData);
}

/**
 * Fund methods
 * */

export function getFunds(userId: number, where = {}) {
  return funds()
    .select<types.FundType>(
      "funds.id",
      "funds.name",
      "funds.size",
      "funds.passthroughFundId",
      "funds.passthroughClosingId",
      "subscriptions.id as subscriptionId",
      "subscriptions.isActive as subscriptionIsActive",
      "subscriptions.passthroughInvestorClosingId as subscriptionPassthroughInvestorClosingId",
      "subscriptions.passthroughInvitationUrl as subscriptionPassthroughInvitationUrl",
      "subscriptions.status as subscriptionStatus"
    )
    .leftJoin(
      knex
        .select(
          "id",
          "userId",
          "fundId",
          "isActive",
          "status",
          "passthroughInvestorClosingId",
          "passthroughInvitationUrl"
        )
        .from("subscriptions")
        .where({ isActive: true, userId })
        .as("subscriptions"),
      "funds.id",
      "subscriptions.fundId"
    )
    .where(where);
}

export function getFundById(userId: number, fundId: number): Promise<types.FundType | null> {
  return getFunds(userId, { "funds.id": fundId }).first();
}

/**
 * Subscription methods
 * */

export function createSubscription(
  fundId: number,
  userId: number,
  investorClosingId: string,
  invitationUrl: string
) {
  return subscriptions().insert({
    fundId,
    userId,
    passthroughInvestorClosingId: investorClosingId,
    passthroughInvitationUrl: invitationUrl,
    isActive: true,
    status: "sent",
  });
}

export function getSubscription(fundId: number, userId: number, trx) {
  return subscriptions()
    .transacting(trx)
    .forUpdate()
    .select("id", "userId", "fundId", "isActive", "status")
    .where({
      userId,
      fundId,
      isActive: true,
    })
    .first();
}

export function updateSubscription({ id, ...attrs }, trx) {
  return subscriptions().transacting(trx).where({ id }).update(attrs);
}

export function updatePassthroughSubscription(passthroughInvestorClosingId, attrs) {
  return subscriptions().where({ passthroughInvestorClosingId }).update(attrs);
}
