


module.exports = {
    
    development: {
        client: 'sqlite3',
        migrations: { directory: './data/migrations' },
        seeds: { directory: './data/seeds' },
        connection:'./data/water_plants.db3',
    },

    testing: { 
        client: 'sqlite3',
        migrations: {directory: './data/migrations' },
        seeds: { directory: './data/seeds' },
        connection: './data/water_plants.db3',
    },

    production: {
        client: 'sqlite3',
        migrations: { directory: './data/migrations' },
        seeds: { directory: './data/seeds'},
        connection:'./data/water_plants.db3',
        pool: { min: 2, max: 10 },
    },
}