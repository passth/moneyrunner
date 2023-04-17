import * as types from "../types";
import knex from "./knex";
import initialData from "./initial_data";

const createUsersTable = async () => {
  const tableName = "users";
  const exists = await knex.schema.hasTable(tableName);

  if (!exists) {
    console.log(`Creating ${tableName} table`);
    await knex.schema.createTable(tableName, (t) => {
      t.increments("id").primary();
      t.string("name", 100);
      t.string("email", 100);
      t.string("password", 100);
    });
  }
};

const createFundsTable = async () => {
  const tableName = "funds";
  const exists = await knex.schema.hasTable(tableName);

  if (!exists) {
    console.log(`Creating ${tableName} table`);
    await knex.schema.createTable(tableName, (t) => {
      t.increments("id").primary();
      t.string("name", 100);
      t.string("size", 100);
      t.string("passthroughFundId", 100);
      t.string("passthroughClosingId", 100);
    });

    console.log(`Loading ${tableName}`);
    const table = knex(tableName);

    for (let i = 0; i < initialData.funds.length; i += 1) {
      // eslint-disable-next-line
      await table.insert(initialData.funds[i]);
    }
  }
};

const createSubscriptionsTable = async () => {
  const tableName = "subscriptions";
  const exists = await knex.schema.hasTable(tableName);

  if (!exists) {
    console.log(`Creating ${tableName} table`);
    await knex.schema.createTable(tableName, (t) => {
      t.increments("id").primary();
      t.boolean("isActive");
      t.string("status", 100);
      t.string("passthroughInvitationUrl", 100);
      t.string("passthroughInvestorClosingId", 100);
      t.integer("userId").unsigned().references("id").inTable("users").onDelete("CASCADE");
      t.integer("fundId").unsigned().references("id").inTable("funds").onDelete("CASCADE");
    });
  }
};

export const createTables = async () => {
  await createUsersTable();
  await createFundsTable();
  await createSubscriptionsTable();
};

export const dropTables = async () => {
  console.log("Droping subscriptions");
  await knex.schema.dropTableIfExists("subscriptions");

  console.log("Droping users");
  await knex.schema.dropTableIfExists("users");

  console.log("Droping funds");
  await knex.schema.dropTableIfExists("funds");
};

export const users = () => knex<types.UserType>("users");

export const funds = () => knex("funds");

export const subscriptions = () => knex<types.SubscriptionType>("subscriptions");
