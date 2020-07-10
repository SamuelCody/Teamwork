const express = require("express");
const router = express.Router();
const { signin, signup } = require("../handlers/auth");
const { loginRequired, userPrivilege } = require("../middleware/auth");

router.post("/auth/create-user", loginRequired, userPrivilege, signup);
router.post("/auth/signin", signin);

module.exports = router;
