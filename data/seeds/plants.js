
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        { "id": 1, "nickname": "Queen Anne's Lace", "species": "Apiaceae", "h2ofrequency": 18, "image": null },
        { "id": 2, "nickname": "Beard Lichen", "species": "Parmeliaceae", "h2ofrequency": 6, "image": null },
        { "id": 3, "nickname": "Ragwort", "species": "Asteraceae", "h2ofrequency": 14, "image": null }
      ]);
    });
};
