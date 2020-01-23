const superTest = require("supertest");
const server = require("../index");

test("Welcome Route", async () => {
   const res = await superTest(server).get("/");

   //Does it return the expected status code?
   expect(res.status).toBe(200);
   //Does it return the expected data format?
   expect(res.type).toMatch(/application\/json/i);
   //Does it return the expected data?
   expect(res.body.message).toMatch(/Welcome/i);
});