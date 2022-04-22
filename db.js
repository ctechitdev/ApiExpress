const Pool = require('pg').Pool;

const pool = new Pool({
    user: "scn_lottery",
    host: "pgm-gs5r3326rt5b0j81ko.pgsql.singapore.rds.aliyuncs.com",
    database: "uat_express",
    password: "Admin123",
    port: "5432"
});

module.exports = pool;
