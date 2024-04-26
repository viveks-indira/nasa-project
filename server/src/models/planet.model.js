const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const planets = require("./planet.mongo"); 

function isHabitatable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_prad"] < 1.6
  );
}

function allPlanetData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitatable(data)) {
          savePlanets(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end",async () => {
        const totalPlanet = (await getAllPlanets()).length;
        console.log(`${totalPlanet} no. of planets are alike earth`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({},{
    '_id':0, '__v':0,
  });
}

async function savePlanets(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name, 
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(`cannot able to add planet ${err}`);
  }
}

module.exports = {
  allPlanetData,
  getAllPlanets,
};
