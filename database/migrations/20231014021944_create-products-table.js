/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.binary("image").notNullable();
    table.string("description");
    table.string("price").notNullable();
    table.string("category").notNullable();
    table.boolean("sold").defaultTo(0); // available by default
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
