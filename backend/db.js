const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: "./mydb.sqlite" },
  useNullAsDefault: true,
});

knex.schema.hasTable('users').then(async function (exists) {
  if (!exists) {
    console.log('Creating users table');
    await knex.schema.createTable('users', function (t) {
      t.increments('id').primary();
      t.string('name', 100);
      t.string('email', 100);
      t.string('password', 100);
    });

    console.log('Creating users');
    await knex('users').insert({
      name: 'John Doe',
      email: 'admin@example.com',
      password: '123'
    });
  }
});

knex.schema.hasTable('funds').then(async function (exists) {
  if (!exists) {
    console.log('Creating funds table');
    await knex.schema.createTable('funds', function (t) {
      t.increments('id').primary();
      t.string('name', 100);
      t.string('size', 100);
      t.string('passthroughFundId', 100);
      t.string('passthroughClosingId', 100);
    });

    console.log('Creating funds');
    const funds = [{
      "id": 1,
      "name": "Fuzzy Finance SPV",
      "size": "$20M",
      "passthroughFundId": "e2ee271b-b701-4090-8dcc-4efe8ad9be99",
      "passthroughClosingId": "41ac78bd-8283-48f4-979f-60629cbc9a0b",
    },
    {
      "id": 2,
      "name": "Bull Market Ventures",
      "size": "$25M",
      "passthroughFundId": "e2ee271b-b701-4090-8dcc-4efe8ad9be99",
      "passthroughClosingId": "f04cfe57-1914-4316-bdbd-ac805e0236b3",
    },
    {
      "id": 3,
      "name": "Bear Necessities Investment Group",
      "size": "$30M",
      "passthroughFundId": "e2ee271b-b701-4090-8dcc-4efe8ad9be99",
      "passthroughClosingId": "41ac78bd-8283-48f4-979f-60629cbc9a0b",
    },
    {
      "id": 4,
      "name": "Wealth Hoarders LLC",
      "size": "$10M",
      "passthroughFundId": "e2ee271b-b701-4090-8dcc-4efe8ad9be99",
      "passthroughClosingId": "41ac78bd-8283-48f4-979f-60629cbc9a0b",
    },
    {
      "id": 5,
      "name": "Stockpicker's Paradise SPV",
      "size": "$70M",
      "passthroughFundId": "e2ee271b-b701-4090-8dcc-4efe8ad9be99",
      "passthroughClosingId": "41ac78bd-8283-48f4-979f-60629cbc9a0b",
    },
    {
      "id": 6,
      "name": "Stock Market Shenanigans Investment Trust",
      "size": "$100M",
      "passthroughFundId": "e2ee271b-b701-4090-8dcc-4efe8ad9be99",
      "passthroughClosingId": "41ac78bd-8283-48f4-979f-60629cbc9a0b",
    }]

    for (let i = 0; i < funds.length; i++) {
      await knex('funds').insert(funds[i]);
    }
  }
});

knex.schema.hasTable('subscriptions').then(async function (exists) {
  if (!exists) {
    console.log('Creating subscriptions table');
    await knex.schema.createTable('subscriptions', function (t) {
      t.increments('id').primary();
      t.boolean('isActive');
      t.string('passthroughInvitationUrl', 100);
      t.string('passthroughInvestorClosingId', 100);
      t.integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      t.integer('fundId')
        .unsigned()
        .references('id')
        .inTable('funds')
        .onDelete('CASCADE');
    });
  }
});

module.exports = {
  knex,
  users: () => knex('users'),
  funds: () => knex('funds'),
  subscriptions: () => knex('subscriptions'),
};
