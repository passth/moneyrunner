const jwt = require('jsonwebtoken');
const { users } = require('../db');

async function getUserByEmail(email) {
  return await users().where({ email }).select().first();
}

async function authenticateUser(email, password) {
  const user = await users().where({ email, password }).select().first();
  if (!user) return null;
  return user;
}

async function verifyToken(token) {
  const data = jwt.verify(token, process.env.MARKETPLACE_SECRET);

  if (!data) {
    return null;
  }

  return await getUserByEmail(data.sub);
}

function createToken({ email }) {
  return jwt.sign(
    { sub: email },
    process.env.MARKETPLACE_SECRET,
    { expiresIn: '1h' }
  );
}

module.exports = {
  authenticateUser,
  verifyToken,
  createToken,
};
