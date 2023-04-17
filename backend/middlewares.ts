import { ErrorRequestHandler } from "express";
import rateLimit from "express-rate-limit";
import knexSession from "connect-session-knex";
import session from "express-session";
import lusca from "lusca";

import { getUserById } from "./services";
import * as db from "./db";

const KnexSessionFactory = knexSession(session);
const sessionStore = new KnexSessionFactory({ knex: db.knex });

export const sessionMiddleware = session({
  secret: process.env.MARKETPLACE_SECRET,
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.ENV !== "local",
    sameSite: "strict",
  },
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
});

export const securityMiddleware = lusca({
  csrf: {
    cookie: { name: "_csrf" },
    secret: process.env.MARKETPLACE_SECRET,
  },
  xframe: "SAMEORIGIN",
  xssProtection: true,
  nosniff: true,
  referrerPolicy: "same-origin",
});

export async function authenticate(req: any, res: any, next: any) {
  const { userId } = req.session;
  if (!userId) return res.status(401).json({ message: "You are unauthenticated" });

  const user = await getUserById(userId);

  if (!user) {
    return res.status(401).json({ message: "Invalid user" });
  }

  req.user = user;
  return next();
}

export const defaultLimiter = rateLimit({
  windowMs: 300000, // 5 minutes
  max: 1000, // 1,000 requests per 1 minute
  message: "Too many requests, please try again later",
  // IP address from requestIp.mw(), as opposed to req.ip
  keyGenerator: (req) => req.clientIp,
});

export const startTransaction = async (req: any, _: any, next: any) => {
  req.trx = await db.knex.transaction();
  next();
};

export const rollbackTransaction: ErrorRequestHandler = (
  error: any,
  req: any,
  _: any,
  next: any
) => {
  req.trx.rollback(error);
  next(error);
};

export const commitTransaction = (req: any, _: any, next: any) => {
  req.trx.commit();
  next();
};
