const express = require("express");
const wakeUp = require("../controllers/wakeUp");

const router = express.Router();

router.get("/", wakeUp);

module.exports = router;
