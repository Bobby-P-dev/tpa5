const express = require('express');
const authRouter = express.Router();

const { registerAuth, loginAuth,  } = require("../controllers/auth.controller");

authRouter.post("/register", registerAuth);
authRouter.post("/login", loginAuth);

module.exports = authRouter;
