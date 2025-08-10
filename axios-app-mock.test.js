import axios from "axios";
import { getUser, createUser } from "./axios-app";

jest.mock("axios");

test("should fetch user", async () => {
  axios.get.mockResolvedValue({ data: { name: "Rajesh" } });

  const user = await getUser();
  expect(user.name).toBe("Rajesh");
});

test("should post user data", async () => {
  const mockUser = { name: "Rajesh" };
  axios.post.mockResolvedValue({ data: mockUser });

  const response = await createUser(mockUser);
  expect(response.data).toEqual(mockUser);
});
