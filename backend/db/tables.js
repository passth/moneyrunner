const knex = require('./knex');
const initialData = require('./initial_data');

const createUsersTable = async () => {
  const tableName = 'users';
  const exists = await knex.schema.hasTable(tableName);

  if (!exists) {
    console.log(`Creating ${tableName} table`);
    await knex.schema.createTable(tableName, function (t) {
      t.increments('id').primary();
      t.string('name', 100);
      t.string('email', 100);
      t.string('password', 100);
    });

    console.log(`Loading ${tableName}`);
    for (let i = 0; i < initialData.users.length; i++) {
      await knex(tableName).insert(initialData.users[i]);
    }
  }
};

const createFundsTable = async () => {
  const tableName = 'funds';
  const exists = await knex.schema.hasTable(tableName);

  if (!exists) {
    console.log(`Creating ${tableName} table`);
    await knex.schema.createTable(tableName, function (t) {
      t.increments('id').primary();
      t.string('name', 100);
      t.string('size', 100);
      t.string('passthroughFundId', 100);
      t.string('passthroughClosingId', 100);
    });

    console.log(`Loading ${tableName}`);
    const table = knex(tableName);

    for (let i = 0; i < initialData.funds.length; i++) {
      await table.insert(initialData.funds[i]);
    }
  }
};

const createSubscriptionsTable = async () => {
  const tableName = 'subscriptions';
  const exists = await knex.schema.hasTable(tableName);

  if (!exists) {
    console.log(`Creating ${tableName} table`);
    await knex.schema.createTable(tableName, function (t) {
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
};

const createTables = async () => {
  await createUsersTable();
  await createFundsTable();
  await createSubscriptionsTable();
};

const dropTables = async () => {
  console.log('Droping subscriptions');
  await knex.schema.dropTableIfExists('subscriptions');

  console.log('Droping users');
  await knex.schema.dropTableIfExists('users');

  console.log('Droping funds');
  await knex.schema.dropTableIfExists('funds');
};

module.exports = {
  users: () => knex('users'),
  funds: () => knex('funds'),
  subscriptions: () => knex('subscriptions'),
  dropTables,
  createTables,
};
