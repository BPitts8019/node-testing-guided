const superTest = require("supertest");
const server = require("../index");
const db = require("../data/config");

beforeEach(async () => {
   await db.seed.run();
});

test("Welcome Route", async () => {
   const res = await superTest(server).get("/");

   //Does it return the expected status code?
   expect(res.status).toBe(200);
   //Does it return the expected data format?
   expect(res.type).toMatch(/application\/json/i);
   //Does it return the expected data?
   expect(res.body.message).toMatch(/Welcome/i);
});

test("Get list of Hobbits", async () => {
   const res = await superTest(server)
      .get("/hobbits");

   expect(res.status).toBe(200);
   expect(res.type).toBe("application/json");
   expect(res.body.length).toBeGreaterThan(0);
   expect(res.body[0]).toEqual({
      id: 1,
      name: "sam"
   });
});

test("Create a Hobbit", async () => {
   const name = "gaffer";
   const res = await superTest(server)
      .post("/hobbits")
      .send({name});
   
   expect(res.status).toBe(201);
   expect(res.type).toBe("application/json");
   expect(res.body).toEqual({id: 5, name});
});