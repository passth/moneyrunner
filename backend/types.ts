import { Request, Response } from "express";

export type FundType = {
  id: number;
  name: string;
  size: string;
  passthroughFundId: string;
  passthroughClosingId: string;
  subscriptionId: string;
  subscriptionIsActive: string;
  subscriptionPassthroughInvestorClosingId: string;
  subscriptionPassthroughInvitationUrl: string;
  subscriptionStatus: string;
};

export type SubscriptionType = {
  id: number;
  isActive: boolean;
  status: string;
  passthroughInvitationUrl: string;
  passthroughInvestorClosingId: string;
  userId: number;
  fundId: number;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
};

export interface RequestType extends Request {
  user: UserType;
  clientIp: string;
  trx?: any;
}

export type ResponseType = Response;
