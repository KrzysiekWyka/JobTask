import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import ApiController from "./controllers/api.controller";
import { connect } from "mongoose";

const app = express();

// Database setup
const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost/orders";

connect(mongoUrl)
  .then(() => {})
  .catch(error => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + error
    );
  });

// Setup port
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Register route
app.all("/", (_, res) => {
  return res.sendfile("index.html");
});

// Register controller
app.use("/api", ApiController);

// Server startup
app.listen(app.get("port"), () => {
  console.log("  App is running at http://localhost:%d", app.get("port"));
  console.log("  Press CTRL-C to stop\n");
});
