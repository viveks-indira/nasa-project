const request = require("supertest");
const app = require("../../app");
const { mongoDisconnect, mongoConnect } = require("../../services/mongo");
const { allPlanetData} = require('../../models/planet.model');

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
    await allPlanetData();
  });

  afterAll(async ()=>{
    await mongoDisconnect();
  })
  describe("Test GET /launches", () => {
    test("it should respnd with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
  describe("Test POST /launches", () => {
    const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "NCC 1704-D",
      target: "Kepler-186 f",
      launchDate: "July 23, 2028",
    };

    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1704-D",
      target: "Kepler-186 f",
    };

    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1704-D",
      target: "Kepler-186 f",
      launchDate: "zoot",
    };

    test("it should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("it should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Some fields are not given",
      });
    });

    test("it should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).not.toStrictEqual({
        error: "Date is not valid",
      });
    });
  });
});