const userSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    email: { type: "string", format: "email" },
  },
  required: ["id", "email"],
  additionalProperties: false,
};

module.exports = userSchema;
