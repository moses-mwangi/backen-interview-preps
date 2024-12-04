import request from "supertest";
import app from "../../app";

describe("User API", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/api/users").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    expect(response.status).toBe(201); // Created
    expect(response.body.name).toBe("John Doe");
    expect(response.body.email).toBe("john@example.com");
  });

  it("should return a list of users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200); // OK
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return user details by ID", async () => {
    const response = await request(app).get("/api/users/1");
    expect(response.status).toBe(200); // OK
    expect(response.body.id).toBe("1");
  });

  it("should update user details", async () => {
    const response = await request(app).put("/api/users/1").send({
      name: "John Updated",
    });
    expect(response.status).toBe(200); // OK
    expect(response.body.name).toBe("John Updated");
  });

  it("should delete a user", async () => {
    const response = await request(app).delete("/api/users/1");
    expect(response.status).toBe(204); // No Content
  });
});
