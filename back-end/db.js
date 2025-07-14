const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  host: 'localhost',
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: 'barber_shop',
});

module.exports = connection;