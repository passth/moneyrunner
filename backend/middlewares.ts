import rateLimit from "express-rate-limit";
import { verifyToken } from "./services";
import * as types from "./types";
import * as db from "./db";

export async function authenticate(req: types.RequestType, res: types.ResponseType, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing Authorization Header" });

  const token = authHeader.split(" ")[1];

  try {
    req.user = await verifyToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

export const defaultLimiter = rateLimit({
  windowMs: 300000, // 5 minutes
  max: 1000, // 1,000 requests per 1 minute
  message: "Too many requests, please try again later",
  // IP address from requestIp.mw(), as opposed to req.ip
  keyGenerator: (req: types.RequestType) => req.clientIp,
});

export const startTransaction = async (req: types.RequestType, _: any, next: any) => {
  req.trx = await db.knex.transaction();
  next();
};

export const rollbackTransaction = (error: any, req: types.RequestType, _: any, next: any) => {
  req.trx.rollback(error);
  next(error);
};

export const commitTransaction = (req: types.RequestType, _: any, next: any) => {
  req.trx.commit();
  next();
};
