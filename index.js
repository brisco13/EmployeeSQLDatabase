// required dependencies/imports
const mysql = require('mysql2');
const inquirer = require('inquirer');
const dotenv = require('dotenv');
const decide = require('./helpers/helpers.js')

require('dotenv').config();

//inquirer prompts/options
const questions = [
  {   type: `list`,
      name: 'nav',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'View All Departments',
          value: 'viewDepts'  
        },
        {
          name: 'View All Roles',
          value: 'viewRoles'  
        },
        {
          name: 'View All Employees',
          value: 'viewEmps'  
        },
        {
          name: 'Add a Department',
          value: 'addDepts'  
        },
        {
          name: 'Add a Role',
          value: 'addRole'  
        },
        {
          name: 'Add an Employee',
          value: 'addEmp'  
        },
        {
          name: 'Update an Employee Role',
          value: 'updRole'  
        },
        {
          name: 'Close database',
          value: 'close'  
        },
      ]
  }
];

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

function startDB() {
  inquirer.prompt(
    { 
      type: 'confirm',
      name: 'start',
      message: 'Hello! Welcome to the Employee Database. Would you like to begin?'
    }
  )
  .then((res)=> {
    if (res.start) {
      navDB();
    } else {
      console.log("Thanks! Goodbye");
      process.exit();
    }
  }
  )
  
}

//set up inquirer 
function navDB() {
  inquirer.prompt(questions)
  .then((res)=> {
    decide(res.nav);
    navDB();
  }
  )
}

startDB();