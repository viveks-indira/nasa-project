const http = require("http");
const app = require("./app");
const {mongoConnect}= require('./services/mongo')
require("dotenv").config();
const { allPlanetData } = require("./models/planet.model");
const {loadLaunchData} = require('./models/launch.model');
const port = process.env.PORT || 8000;

// "start": "set PORT=5000&& node src/server.js"

const server = http.createServer(app);

async function startPlanet() {
  await mongoConnect();
  await allPlanetData();
  await loadLaunchData();

  server.listen(port, () => {
    console.log(`listening on Port ${port}...`);
  });
}

startPlanet();
