const express = require("express");
const { httpGetAllPlanets } = 
require("../../controllers/planetsController");

const route = express.Router();

route.get("/planets", httpGetAllPlanets);

module.exports = route;