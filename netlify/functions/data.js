const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const notesRouter = require("./controllers/notes");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

logger.info("Connecting to MongoDB...");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB.");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(middleware.middlewareLogger);

app.use("/api/data", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
