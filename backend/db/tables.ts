// cspell:words sess tablename createtable
import knexSession from "connect-session-knex";
import session from "express-session";
import * as types from "../types";
import knex from "./knex";

const createUsersTable = async () => {
  const tableName = "users";
  const exists = await knex.schema.hasTable(tableName);

  if (!exists) {
    console.log(`Creating ${tableName} table`);
    await knex.schema.createTable(tableName, (t) => {
      t.increments("id").primary();
      t.string("name", 100);
      t.string("email", 100);
    });
  }
};

const createSessionTable = async () => {
  const tableName = "sessions";
  const exists = await knex.schema.hasTable(tableName);

  if (!exists) {
    console.log(`Creating ${tableName} table`);
    await knex.schema.createTable(tableName, (t) => {
      t.string("sid").primary();
      t.json("sess");
      t.timestamp("expired").defaultTo(knex.fn.now());
    });
  }
};

const createSessionStore = () => {
  const KnexSessionFactory = knexSession(session);
  return new KnexSessionFactory({
    knex,
    tablename: "sessions",
    createtable: false,
  });
};

export const createTables = async () => {
  await createSessionTable();
  await createUsersTable();
};

export const dropTables = async () => {
  console.log("Dropping users");
  await knex.schema.dropTableIfExists("users");

  console.log("Dropping sessions");
  await knex.schema.dropTableIfExists("sessions");
};

export const users = () => knex<types.UserType>("users");

export const sessionStore = createSessionStore();
