const knex = require('./knex');
const tables = require('./tables');

module.exports = { ...tables, knex };
