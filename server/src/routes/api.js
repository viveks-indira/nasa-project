const express = require('express');
const pRouter = require("../routes/planets/planet.router");
const lRouter = require("../routes/launches/launches.router");

const api = express.Router();

api.use(pRouter);
api.use(lRouter);

module.exports = api;