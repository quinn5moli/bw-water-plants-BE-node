
exports.up = function(knex) {
  return knex.schema.createTable('plants', (table) => {
      table.increments('id').primary();
      table.string('nickname').notNullable();
      table.string('species').notNullable();
      table.string('h2ofrequency').notNullable();
      table.string('image');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('plants')
};
