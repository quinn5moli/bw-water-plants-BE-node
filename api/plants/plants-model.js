const db = require('../../data/dbConfig');

async function getPlants() {
    return await db('plants');
}

async function getPlantBy(filter) {
    return await db('plants').where(filter);
}

async function getPlantById(id) {
    return await db('plants').where({ id });
}

async function addPlant(plant) {
    return await db('plants').insert(plant);
}

async function updatePlant({ id, plant }) {
    const success = await db('plants').where({ id }).update(plant);
    if (success) {
        console.log(`Plant ${id} updated`);
        return await getPlantById(id);
    } else {
        console.log(`Internal error updating Plant ${id}`);
        return null;
    }
}

async function deletePlant(id) {
    console.log(id)
    const success = await db('plants').where({ id }).del();
    if (success) {
        console.log(`Plant ${id} deleted`);
        return true;
    } else {
        console.log(`Internal error deleting Plant ${id}`);
        return false;
    }
}

module.exports = {
    getPlants,
    getPlantBy,
    getPlantById,
    addPlant,
    updatePlant,
    deletePlant
};