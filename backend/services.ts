import * as jwt from "jsonwebtoken";
import { funds, subscriptions, users, knex } from "./db";
import * as types from "./types";

/**
 * Authentication methods
 * */

export function getUserByEmail(email: string): Promise<types.UserType | null> {
  return users().where({ email }).select().first();
}

export async function authenticateUser(email: string, password: string): Promise<string | null> {
  // @ts-ignore
  const user = await users().where({ email, password }).select().first();
  if (!user) return null;
  return jwt.sign({ sub: email }, process.env.MARKETPLACE_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): Promise<types.UserType | null> {
  const data = jwt.verify(token, process.env.MARKETPLACE_SECRET);

  if (!data) {
    return null;
  }

  // @ts-ignore
  return getUserByEmail(data.sub);
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

export function updateSubscription({ id, ...attrs }) {
  return subscriptions().where({ id }).update(attrs);
}

export function updatePassthroughStatus(passthroughInvestorClosingId, status) {
  return subscriptions().where({ passthroughInvestorClosingId }).update({ status });
}
