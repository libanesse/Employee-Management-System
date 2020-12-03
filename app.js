const inquirer = require('inquirer');
const mysql = require('mysql');
const figlet = require('figlet');
const cTable = require('console.table');
const credentials = require('./config');


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "#Mello1560",
  database: "employee_db"
});
connection.connect()

function questions() {
    inquirer
      .prompt({
        name: "menu",
        type: "list",
        message: "Welcome to the Employee Tracker",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Remove Employee",
          "Add Role",
          "Delete Role",
          "Add Department",
          "Exit",
        ],
      })
      .then((answer) => {
        switch (answer.menu) {
          case "View All Employees":
            viewAllEmployees();
            break;
  
          case "View All Departments":
            viewAllDepartments();
            break;
  
          
  
          case "View All Roles":
            viewAllRoles();
            break;
  
          case "Add Employee":
            addEmployee();
            break;
  
          case "Remove Employee":
            removeEmployee();
            break;
  
          case "Add Role":
            addRole();
            break;
  
          
  
          case "Add Department":
            addDepartment();
            break;
  
         
  
          case "Update Employee Role":
            updateEmployeeRole();
            break;
  
          case "Delete Role":
              deleteRole();
              break;
  
          case "Exit":
            connection.end();
            break;
        }
      });
  }
  
  function viewAllEmployees() {
    const query =
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee, role WHERE role.id = employee.role_id";
    connection.query(query, function (err, res) {
      //if (err) console.log(err) ;
      
      console.table(res);
      questions();
    });
  }
  
  function viewAllDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      questions();
    });
  }
  
  function viewAllEmployeesByManager() {
    const managerArr = [];
    let query =
      "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee WHERE manager_id IS NULL";
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      for (let i = 0; i < res.length; i++) {
        let managerStr =
          res[i].id + " " + res[i].first_name + " " + res[i].last_name;
        managerArr.push(managerStr);
      }
  
      inquirer
        .prompt({
          name: "managerList",
          type: "list",
          message: "Please select a supervisor to view their employees.",
          choices: managerArr,
        })
        .then((answer) => {
          const employeeList = {};
          employeeList.managerID = parseInt(answer.managerList.split(" ")[0]);
  
          let query = "SELECT * FROM employee WHERE ?";
  
          connection.query(
            query,
            { manager_id: employeeList.managerID },
            function (err, res) {
              if (err) throw err;
              console.table(res);
              questions();
            }
          );
        });
    });
  }
  
  function viewAllRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      questions();
    });
  }
  
  function addEmployee() {
    const roleArr = [];
    const employeeArr = [];
  
    connection.query("SELECT * FROM role", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        let roleStr = res[i].id + " " + res[i].title;
        roleArr.push(roleStr);
      }
  
      connection.query("SELECT * FROM employee", function (err, res) {
        for (let i = 0; i < res.length; i++) {
          let employeeStr =
            res[i].id + " " + res[i].first_name + " " + res[i].last_name;
          employeeArr.push(employeeStr);
        }
  
        inquirer
          .prompt([
            {
              name: "newFirstName",
              type: "input",
              message: "What's the new employee's first name?",
            },
            {
              name: "newLastName",
              type: "input",
              message: "What's the new employee's last name?",
            },
            {
              name: "newRoleID",
              type: "list",
              message: "What's the new employee's role?",
              choices: roleArr,
            },
            {
              name: "newManagerID",
              type: "list",
              message: "Who is the new employee's supervisor?",
              choices: employeeArr,
            },
          ])
          .then((answer) => {
            const newEmployee = {};
            newEmployee.roleID = parseInt(answer.newRoleID.split(" ")[0]);
            newEmployee.managerID = parseInt(answer.newManagerID.split(" ")[0]);
  
            connection.query(
              "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
              [
                answer.newFirstName,
                answer.newLastName,
                newEmployee.roleID,
                newEmployee.managerID,
              ]
            ),
              function (err, res) {
                if (err) throw err;
                console.table(res);
              };
            console.log("The employee has been added!");
            questions();
          });
      });
    });
  }
  
  function removeEmployee() {
    let employeeArr = [];
  
    connection.query("SELECT * FROM employee", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        let employeeStr =
          res[i].id + " " + res[i].first_name + " " + res[i].last_name;
        employeeArr.push(employeeStr);
      }
      inquirer
        .prompt({
          name: "removeEmployee",
          type: "list",
          message: "Please select the employee you would like to remove",
          choices: employeeArr,
        })
        .then((answer) => {
          const removeID = parseInt(answer.removeEmployee.split(" ")[0]);
  
          let query = "DELETE FROM employee WHERE ?";
  
          connection.query(query, { id: removeID }, function (err, res) {
            if (err) throw err;
          });
          console.log("Employee has been removed.");
          questions();
        });
    });
  }
  
  function addRole() {
    const departmentArr = [];
  
    connection.query("SELECT * FROM department", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        let departmentStr = res[i].id + " " + res[i].name;
        departmentArr.push(departmentStr);
      }
  
      inquirer
        .prompt([
          {
            name: "newRole",
            type: "input",
            message: "What is the title of the role you would like to add?",
          },
          {
            name: "newRoleSalary",
            type: "input",
            message: "What is the salary for this role?",
          },
          {
            name: "departmentID",
            type: "list",
            message: "Which department is the new role part of?",
            choices: departmentArr,
          },
        ])
        .then(function (answer) {
          const newRole = {};
          newRole.departmentID = parseInt(answer.departmentID.split(" ")[0]);
  
          connection.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
            [answer.newRole, answer.newRoleSalary, newRole.departmentID]
          ),
            function (err, res) {
              if (err) throw err;
            };
          console.log("Role has been added!");
          questions();
        });
    });
  }
  
  function deleteRole() {
    let roleArr = [];
  
    connection.query("SELECT * FROM role", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        let roleStr = res[i].id + " " + res[i].title;
        roleArr.push(roleStr);
      }
      inquirer
        .prompt({
          name: "removeRole",
          type: "list",
          message: "Please select the role you would like to remove",
          choices: roleArr,
        })
        .then((answer) => {
          const removeID = parseInt(answer.removeRole.split(" ")[0]);
  
          let query = "DELETE FROM role WHERE ?";
  
          connection.query(query, { id: removeID }, function (err, res) {
            if (err) throw err;
          });
          console.log("Role has been removed.");
          questions();
        });
    });
  }
  
  function addDepartment() {
    inquirer
      .prompt({
        type: "input",
        message: "What is the title of the department you would like to add?",
        name: "newDepartment",
      })
      .then((answer) => {
        connection.query(
          "INSERT INTO department (name) VALUES (?)",
          [answer.newDepartment],
          function (err, res) {
            if (err) throw err;
          }
        );
        console.log("Department added successfully!");
        questions();
      });
  }
  
  function deleteDepartment() {
    let departmentArr = [];
  
    connection.query("SELECT * FROM department", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        let departmentStr = res[i].id + " " + res[i].name;
        departmentArr.push(departmentStr);
      }
      inquirer
        .prompt({
          name: "removeDepartment",
          type: "list",
          message: "Please select the department you would like to remove",
          choices: departmentArr,
        })
        .then((answer) => {
          const removeID = parseInt(answer.removeDepartment.split(" ")[0]);
  
          let query = "DELETE FROM department WHERE ?";
  
          connection.query(query, { id: removeID }, function (err, res) {
            if (err) throw err;
          });
          console.log("Department has been removed.");
          questions();
        });
    });
  }
  
  function updateEmployeeRole() {
    // TO DO: Update manager_id to reflect which supervisor oversees the new role.
    let roleArr = [];
    connection.query("SELECT * FROM role", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        let roleStr = res[i].id + " " + res[i].title;
        roleArr.push(roleStr);
      }
  
      let employeeArr = [];
      connection.query("SELECT * FROM employee", function (err, res) {
        for (let i = 0; i < res.length; i++) {
          let employeeStr =
            res[i].id + " " + res[i].first_name + " " + res[i].last_name;
          employeeArr.push(employeeStr);
        }
  
        inquirer
          .prompt([
            {
              name: "updateRole",
              type: "list",
              message: "Select the employee whose role you would like to update.",
              choices: employeeArr,
            },
            {
              name: "newRole",
              type: "list",
              message: "Please select the employee's new role.",
              choices: roleArr,
            },
          ])
          .then((answer) => {
            const updateID = {};
            updateID.employeeID = parseInt(answer.updateRole.split(" ")[0]);
            updateID.newID = parseInt(answer.newRole.split(" ")[0]);
  
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
              updateID.newID,
              updateID.employeeID,
            ]);
            console.log("Role successfully updated!");
            questions();
          });
      });
    });
  }
  
  function updateEmployeeManager() {
    let employeeArr = [];
    let managerArr = [];
  
    connection.query("SELECT * FROM employee", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        let employeeStr =
          res[i].id + " " + res[i].first_name + " " + res[i].last_name;
        employeeArr.push(employeeStr);
        managerArr.push(employeeStr);
      }
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Which employee needs a new manager?",
            choices: employeeArr,
          },
          {
            name: "manager",
            type: "list",
            message: "Who is the new manager for this employee?",
            choices: managerArr,
          },
        ])
        .then((answer) => {
          const updateManager = {};
          updateManager.employeeID = parseInt(answer.employee.split(" ")[0]);
          updateManager.managerID = parseInt(answer.manager.split(" ")[0]);
          let query = "UPDATE employee SET manager_id = ? WHERE id = ?";
  
          connection.query(
            query,
            [updateManager.managerID, updateManager.employeeID],
            function (err, res) {
              if (err) throw err;
            }
          );
          console.log("Employee manager has been updated.");
          questions();
        });
    });
  }
  
  function viewDepartmentBudget() {
    let query =
      "SELECT department.id AS id, department.name AS departments, SUM(salary) AS budget FROM role LEFT JOIN department ON role.department_id = department.id GROUP BY role.department_id";
  
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      questions();
    });
  }
  
  figlet("Employee Tracker", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
  
  setTimeout(function () {
    questions();
  }, 3000);