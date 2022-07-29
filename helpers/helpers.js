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
    console.log("view depts played");
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

module.exports = decide