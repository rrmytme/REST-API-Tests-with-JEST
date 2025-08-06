const request = require("supertest");
const app = require("./schemValidation-app");
const { matchers } = require("jest-json-schema");
const userSchema = require("./models/userSchema");

expect.extend(matchers);

describe("User API", () => {
  test("GET /users/:id returns valid user", async () => {
    const res = await request(app).get("/users/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchSchema(userSchema);
  });
});
