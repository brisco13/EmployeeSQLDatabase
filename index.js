// required dependencies/imports
const mysql = require('mysql2');
const inquirer = require('inquirer');
const dotenv = require('dotenv');
const table = require('console.table');

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
  let criteria = "SELECT department.id AS ID, department.dept_name AS Department FROM department"
  db.query(criteria, function(err,res) {
    if (err) throw err;
    console.log('\n')
    console.table(res);
    console.log('Please press an arrow key to return to the menu.\n\n\n\n\n\n\n')
  });
  navDB();
}
function viewRoles() {
  let criteria = "SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.dept_name AS Department FROM role JOIN department ON role.dept_id = department.id"
  db.query(criteria, function(err,res) {
    if (err) throw err;
    console.log('\n')
    console.table(res);
    console.log('Please press an arrow key to return to the menu.\n\n\n\n\n\n\n')
  });
  navDB();
}
function viewEmps() {
  let criteria = "SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Title, department.dept_name AS Department , role.salary AS Salary, CONCAT(manager.first_name, manager.last_name) AS Manager FROM employee JOIN role ON employee.role_id = role.id JOIN department on role.dept_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
  db.query(criteria, function(err,res) {
    if (err) throw err;
    console.log('\n')
    console.table(res);
    console.log('Please press an arrow key to return to the menu.\n\n\n\n\n\n\n')
  });
  navDB();
}
function addDepts() {
  inquirer.prompt(
    { 
      type: 'input',
      name: 'dept_name',
      message: 'What is the name of the new department?'
    }).then((res) =>{
      db.connect(function(err) {
        if (err) throw err;
        const add = "INSERT INTO department SET ?"
        db.query(add,res, function(err,res1){
        if (err) throw err;
        console.log(`Successful Add!`)
        navDB();
      })
      })
    })
  
}
function addRole() {
    inquirer.prompt([
      { 
        type: 'input',
        name: 'new_Role',
        message: 'What is the title of the new role?'
      },
      { 
        type: 'input',
        name: 'new_Money',
        message: 'What is the compensation($) of the new role?'
      },
      { 
        type: 'input',
        name: 'new_Dept',
        message: 'What department is the new role a part of?'
      }]).then((res) =>{
        console.log(`res = %j`,res)
        let title = res.new_Role;
        let comp = res.new_Money;
        let dept = res.new_Dept; 
        let q1 = "SELECT department.id AS ID, department.dept_name AS Department FROM department WHERE department.dept_name = ?";
        db.query(q1,dept, function(err,res1) {
          if (err) throw err;
          dept = parseInt(res1[0].ID);
        let role = {
          title: title,
          salary: comp,
          dept_id: dept
        }
        console.log(`role = %j`,role)
        const add = "INSERT INTO role SET ?"
        db.query(add, role, function(err,res2){
        if (err) throw err;
        console.log(`Successful Add!`)
        navDB();
        })
        })
      })
  }

function addEmp() {
  console.log("addEmp played")
  navDB();
}
function updRole() {
  console.log("updRole played")
  navDB();
}