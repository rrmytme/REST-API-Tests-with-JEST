const userSchema = {
  type: "object",
  required: ["id", "email"],
  properties: {
    id: { type: "number" },
    email: { type: "string", format: "email" },
  },
};

module.exports = userSchema;
