const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "sttx1234",
  host: "LocalHost",
  port: 5432,
  database: "TestLocations"
});


module.exports = pool;