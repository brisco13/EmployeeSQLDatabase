-- delete if exists
DROP DATABASE IF EXISTS employee_db;
-- make database
CREATE DATABASE employee_db;
-- select database
USE employee_db;
-- create tables
CREATE TABLE department(
  id INT AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(8,2) NOT NULL,
  dept_id INT,
  FOREIGN KEY (dept_id)
    REFERENCES department(id)

);

CREATE TABLE employee(
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
    REFERENCES role(id)
);