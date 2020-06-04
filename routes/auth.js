const express = require("express");
const router = express.Router();
const { signup } = require("../handlers/auth");

router.post("/auth/create-user", signup);

module.exports = router;
