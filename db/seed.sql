USE employee_db;

-- Department Seeds
INSERT INTO department (id, name)
VALUES (1, "Engineering");

INSERT INTO department (id, name)
VALUES (2, "Marketing");

INSERT INTO department (id, name)
VALUES (3, "Human Resources");

INSERT INTO department (id, name)
VALUES (4, "IT");

-- Role Seeds
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Engineer", 65000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Engineer Supervisor", 80000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Sales Representative", 55000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Sales Manager", 70000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Human Resources Manger", 48000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Human Resources ", 59000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Tech Support", 60000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "IT Manger", 75000, 4);

-- Employee Seeds
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Alex", "Armstrong", 2, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Edward", "Snow", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Roy", "Brandon", 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Alphonse", "Elric", 8, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Winry", "Rockbell", 1, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Ming", "Yao", 1, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Riza", "Hawkeye", 1, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "King", "Bradley", 3, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Jean", "Claude", 3, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Melissa", "Ross", 3, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (11, "Avery", "Bradley", 5, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (12, "Brian", "Curtis", 5, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (13, "Barry", "Falman", 5, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (14, "Tim", "Poole", 7, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (15, "John", "Stockton", 7, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (16, "Larry", "Hughes", 7, 4);