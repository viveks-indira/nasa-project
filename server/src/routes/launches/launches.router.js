
const express = require("express");
const {
  httpGetAllLaunches,
  httpGetNewLaunch,
  httpAbortLaunch,
} = require("../../controllers/launchesController");

const route = express.Router();

route.get("/launches", httpGetAllLaunches);
route.post("/launches", httpGetNewLaunch);
route.delete("/launches/:id",httpAbortLaunch)

module.exports = route;
