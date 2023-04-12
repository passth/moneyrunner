import knex from "knex";

const pgUser = process.env.PG_USER;
const pgPass = process.env.PG_PASS;
const pgName = process.env.PG_NAME;
const pgHost = process.env.PG_HOST;
const isPgEnabled = Boolean(pgUser && pgPass && pgName && pgHost);

if (isPgEnabled) {
  console.log(`Using PostgreSQL: ${pgHost}`);
}

const instance = isPgEnabled
  ? knex({
      client: "pg",
      connection: {
        host: pgHost,
        user: pgUser,
        password: pgPass,
        database: pgName,
      },
      searchPath: ["knex", "public"],
      useNullAsDefault: true,
    })
  : knex({
      client: "sqlite3",
      connection: { filename: "./local.sqlite" },
      useNullAsDefault: true,
    });

export default instance;
