const initialFunds = require('./initial_data/funds.js');
const initialUsers = require('./initial_data/users.js');
const knex = process.env.PG_CONNECTION_STRING ? (
  require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public'],
    useNullAsDefault: true,
  })
) : (
  require('knex')({
    client: 'sqlite3',
    connection: { filename: "./local.sqlite" },
    useNullAsDefault: true,
  })
);

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
    for (let i = 0; i < initialUsers.length; i++) {
      await knex('users').insert(initialUsers[i]);
    }
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
    for (let i = 0; i < initialFunds.length; i++) {
      await knex('funds').insert(initialFunds[i]);
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
