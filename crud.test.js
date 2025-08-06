// app.test.js
const request = require("supertest");
const app = require("./crud-app");

let token;
let itemId;

describe("REST API with Auth", () => {
  beforeAll(async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "testuser" });
    token = res.body.token;
  });

  test("Create item", async () => {
    const res = await request(app)
      .post("/items")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Item" });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Item");
    itemId = res.body.id;
  });

  test("Read item", async () => {
    const res = await request(app)
      .get(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(itemId);
  });

  test("Update item", async () => {
    const res = await request(app)
      .put(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Item" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Item");
  });

  test("Delete item", async () => {
    const res = await request(app)
      .delete(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });

  test("Unauthorized access", async () => {
    const res = await request(app).get(`/items/${itemId}`);
    expect(res.statusCode).toBe(401);
  });
});
