const express = require('express');
const services = require('../services');
const router = express.Router();

router.post('/login', async function (req, res) {
  const { email, password } = req.body;
  const user = await services.auth.authenticateUser(email, password);

  if (!user) {
    return res.status(400).json({
      error: 'User does not exist or password is incorret.'
    });
  }

  const token = services.auth.createToken({ email });
  return res.status(200).json({ token });
});

module.exports = router;
