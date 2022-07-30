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
  console.log("\nSuccessfully connected to employee_db!\n")
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
      case 'addEmp':
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
        console.log(`Successfully Added new department!`)
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
        console.log(`Successfully Added new role!`)
        navDB();
        })
        })
      })
  }

function addEmp() {
  let mang_list = []; let mang_index = [];
  let role_list = []; let role_index = [];
  q = "SELECT * FROM employee WHERE employee.manager_id IS NULL"
  db.query(q, function(err,res2){
    if (err) throw err;
    res2.forEach(each => {
      const text = `${each.first_name}${each.last_name}`;
      const ind = parseInt(each.id);
      mang_list.push(text);
      mang_index.push(ind);
    });
    q3 = "SELECT role.id AS id, role.title AS title FROM role"
  db.query(q3, function(err,res3){
    if (err) throw err;
    res3.forEach(each => {
      const text = each.title;
      const ind = parseInt(each.id);
      role_list.push(text);
      role_index.push(ind);
    });

  inquirer.prompt([
    { 
      type: 'input',
      name: 'first',
      message: 'What is the first name of the new employee?'
    },
    { 
      type: 'input',
      name: 'last',
      message: 'What is the last name of the new employee?'
    },
    { 
      type: 'list',
      name: 'role',
      message: 'What is the role of the new employee?',
      choices: role_list
    },
    { 
      type: 'list',
      name: 'manager',
      message: 'What is the role of the new employee?',
      choices: mang_list
    }
  ]).then((res) =>{
      console.log(`res = %j`,res)
      let first = res.first;
      let last = res.last;
      let role_new = role_index[role_list.indexOf(res.role)];
      let manager = mang_index[mang_list.indexOf(res.manager)];

      let emp = {
        first_name: first,
        last_name: last,
        role_id: role_new,
        manager_id: manager
      }
      console.log(`emp = %j`,emp)

      const add = "INSERT INTO employee SET ?"
      db.query(add, emp, function(err,res2){
      if (err) throw err;
      console.log(`Successfully Added a new team member!`)
      navDB();
      })
      })
    })
  })
}


function updRole() {
  let emp_list = []; let emp_index = [];
  let role_list = []; let role_index = [];
  q = "SELECT * FROM employee"
  db.query(q, function(err,res2){
    if (err) throw err;
    res2.forEach(each => {
      const text = `${each.last_name}, ${each.first_name}`;
      const ind = parseInt(each.id);
      emp_list.push(text);
      emp_index.push(ind);
    });
    q3 = "SELECT role.id AS id, role.title AS title FROM role"
  db.query(q3, function(err,res3){
    if (err) throw err;
    res3.forEach(each => {
      const text = each.title;
      const ind = parseInt(each.id);
      role_list.push(text);
      role_index.push(ind);
    });

  inquirer.prompt([
    { 
      type: 'list',
      name: 'emp',
      message: `Which employee's role would you like to update?`,
      choices: emp_list
    },
    { 
      type: 'list',
      name: 'role',
      message: 'What is the new role of this employee?',
      choices: role_list
    }    
  ]).then((res) =>{
      let role_new = role_index[role_list.indexOf(res.role)];
      let employ = emp_index[emp_list.indexOf(res.emp)];

      const add = `UPDATE employee SET role_id = ${role_new} WHERE id = ${employ}`
      db.query(add, function(err,res2){
      if (err) throw err;
      console.log(`Successfully updated role!`)
      navDB();
      })
      })
    })
  })
}