
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: '1',
          username: 'cRonaldo',
          password: '1234', 
          first_name: 'Cristiano', 
          last_name: 'Ronaldo', 
          email: 'cr7@email.com'
      },
      {
          id: '2',
          username: 'tHenry', 
          password: '1234', 
          first_name: 'Thierry',
          last_name: 'Henry', 
          email: 'TH14@email.com'
      },
      {
          id: '3',
          username: 'tBrady', 
          password: '1234', 
          first_name: 'Tom',
          last_name: 'Brady',
          email: 'TB12@email.com'
      }
      ]);
    });
};
