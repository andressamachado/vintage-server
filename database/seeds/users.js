/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").delete();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      first_name: "Admin",
      last_name: "Admin",
      email: "admin@vintage.shop",
      password: "123",
      phone: "1234567890",
      address: "1234 Main St",
      isAdmin: 1, // yes
    },
    {
      id: 2,
      first_name: "John",
      last_name: "Doe",
      email: "john-doe@vintage.shop",
      password: "123",
      phone: "1234567890",
      address: "1234 Main St",
      isAdmin: 0,
    },
    {
      id: 3,
      first_name: "Jane",
      last_name: "Doe",
      email: "jane-doe@vintage.shop",
      password: "123",
      phone: "1234567890",
      address: "1234 Main St",
      isAdmin: 0,
    },
  ]);
};
