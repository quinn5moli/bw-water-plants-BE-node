
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
