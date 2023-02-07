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
      "passthroughFundId": "4e915147-60be-42f2-830c-a73eedb3fe69",
      "passthroughClosingId": "396ba538-ab0a-468c-a9cf-d68373bf526e",
    },
    {
      "id": 2,
      "name": "Bull Market Ventures",
      "size": "$25M",
      "passthroughFundId": "f9625f1e-f065-4f77-b146-ecdb218fcd6d",
      "passthroughClosingId": "a05d4644-a7c1-46bc-9328-245742a03ff1",
    },
    {
      "id": 3,
      "name": "Bear Necessities Investment Group",
      "size": "$30M",
      "passthroughFundId": "22b5e770-1589-4076-b421-bd5915feb48a",
      "passthroughClosingId": "5b15d71c-8bb2-4854-a474-50828fee795e",
    },
    {
      "id": 4,
      "name": "Wealth Hoarders LLC",
      "size": "$10M",
      "passthroughFundId": "25bca147-b0fa-4a21-b7c6-2a3969ae7df3",
      "passthroughClosingId": "b1273e9c-854d-45b0-9a71-e349dedff053",
    },
    {
      "id": 5,
      "name": "Stockpicker's Paradise SPV",
      "size": "$70M",
      "passthroughFundId": "ff95ee9c-0ac8-49db-9165-8456986845d6",
      "passthroughClosingId": "5d48ab89-74eb-4cfa-b98a-38b9466f35be",
    },
    {
      "id": 6,
      "name": "Stock Market Shenanigans Investment Trust",
      "size": "$100M",
      "passthroughFundId": "bfc4f42e-9a71-4f1b-b937-84f219459355",
      "passthroughClosingId": "8303767c-7877-45aa-84a6-544962d30f19",
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
