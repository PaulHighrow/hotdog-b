const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const router = require("./routes/main");
const leadsRouter = require("./routes/leads");
const translationLeadsRouter = require("./routes/tr-leads");
const tokensRouter = require("./routes/tokens");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/", router);
app.use("/leads", leadsRouter);
app.use("/tr-leads", translationLeadsRouter);
app.use("/tokens", tokensRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
