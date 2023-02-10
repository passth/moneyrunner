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

module.exports = knex;
