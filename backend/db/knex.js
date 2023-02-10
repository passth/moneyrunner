const pgUser = process.env.PG_USER;
const pgPass = process.env.PG_PASS;
const pgName = process.env.PG_NAME;
const pgHost = process.env.PG_HOST;
const isPgEnabled = Boolean(pgUser && pgPass && pgName && pgHost);

const knex = isPgEnabled ? (
  require('knex')({
    client: 'pg',
    connection: {
      host: pgHost,
      user: pgUser,
      password: pgPass,
      database: pgName,
    },
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

module.exports = knex;
