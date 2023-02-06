const rateLimit = require("express-rate-limit");
const services = require('./services');

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing Authorization Header' });

  const token = authHeader.split(' ')[1];
  try {
    req.user = await services.auth.verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
}

const defaultLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50, // 50 requests per 15 minutes
  message: "Too many requests, please try again later"
});

const authenticatedLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 200, // 200 requests per 30 minutes
  message: "Too many requests, please try again later"
});

module.exports = {
  authenticate,
  defaultLimiter,
  authenticatedLimiter,
};
