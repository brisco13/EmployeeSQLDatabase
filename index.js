// required dependencies/imports
const mysql = require('mysql2');
const inquirer = require('inquirer');
const dotenv = require('dotenv');

require('dotenv').config();

// Use environment variables to connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log("successfully connected to employee_db.")
);
