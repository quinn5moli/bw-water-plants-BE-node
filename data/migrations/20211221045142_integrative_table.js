
exports.up = function(knex) {
    return knex.schema.createTable('users_plants', (table) => {
        table.increments('id').primary();
        table.integer('user_id').references('users.id').notNullable().onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('plant_id').references('plants.id').onUpdate('CASCADE').onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users_plants');
};
