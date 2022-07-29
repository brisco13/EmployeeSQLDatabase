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

//begin logic
function decide (res) {
  switch (res) {
      case 'viewDepts':
          viewDepts()
          break;
      case 'viewRoles':
          viewRoles()
          break;
      case 'viewEmps':
          viewEmps()
          break;
      case 'addDepts':
          addDepts()
          break;
      case 'addRole':
          addRole()
          break;
      case 'addEmp()':
          addEmp()
          break;
      case 'updRole':
          updRole()
          break;
      default:
        console.log("Thanks! Goodbye");
        process.exit();
    }

}

function viewDepts() {
  db.query("SELECT * FROM department");
}
function viewRoles() {
  console.log("viewRoles played")
}
function viewEmps() {
  console.log("viewEmps played")
}
function addDepts() {
  console.log("addDepts played")
}
function addRole() {
  console.log("addRole played")
}
function addEmp() {
  console.log("addEmp played")
}
function updRole() {
  console.log("updRole played")
}