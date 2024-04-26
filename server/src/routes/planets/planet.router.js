const express = require("express");
const { httpGetAllPlanets } = require("./planet.controller");

const route = express.Router();

route.get("/planets", httpGetAllPlanets);

module.exports = route;