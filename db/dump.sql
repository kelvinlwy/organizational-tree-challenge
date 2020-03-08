-- Remove database 'company'
DROP DATABASE IF EXISTS company;
-- Create database 'company'
CREATE DATABASE IF NOT EXISTS company;
-- Select the database 'company'
USE company;

-- Remove tables if exist
DROP TABLE IF EXISTS employee, position, supervisor_subordinate, employee_position;

-- Create employe table
CREATE TABLE employee (
  id INT unsigned NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) DEFAULT NULL,
  start_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  end_date timestamp DEFAULT NULL,
  PRIMARY KEY (id)
);

-- Create position table
CREATE TABLE position (
  id INT unsigned NOT NULL AUTO_INCREMENT,
  title VARCHAR(20) NOT NULL,
  level INT NOT NULL CHECK (level > 0),
  PRIMARY KEY (id)
);

-- Create employee position relationship table
CREATE TABLE employee_position (
  employee_id INT unsigned NOT NULL,
  position_id INT unsigned NOT NULL,
  UNIQUE KEY employee_position_employee_id_position_id_unique (employee_id, position_id),
  KEY employee_position_employee_id_foreign (employee_id),
  KEY employee_position_position_id_foreign (position_id),
  CONSTRAINT employee_position_employee_id_foreign
  FOREIGN KEY (employee_id) REFERENCES employee (id) ON DELETE CASCADE,
  CONSTRAINT employee_position_position_id_foreign
  FOREIGN KEY (position_id) REFERENCES position (id) ON DELETE CASCADE
);

-- Create supervisor subordinate relationship table
CREATE TABLE supervisor_subordinate (
  supervisor_id INT unsigned NOT NULL,
  employee_id INT unsigned NOT NULL,
  UNIQUE KEY supervisor_subordinate_supervisor_id_employee_id_unique (supervisor_id, employee_id),
  KEY supervisor_subordinate_supervisor_id_foreign (supervisor_id),
  KEY supervisor_subordinate_employee_id_foreign (employee_id),
  CONSTRAINT supervisor_subordinate_supervisor_id_foreign
  FOREIGN KEY (supervisor_id) REFERENCES employee (id) ON DELETE CASCADE,
  CONSTRAINT supervisor_subordinate_employee_id_foreign
  FOREIGN KEY (employee_id) REFERENCES employee (id) ON DELETE CASCADE,
  CONSTRAINT not_equal CHECK (employee_id <> supervisor_id)
);

-- Create the trigger to fire a removal event to
-- remove all subordinates assigned to the supervisor who has changed the position
CREATE TRIGGER remove_subordinates
AFTER UPDATE ON employee_position
FOR EACH ROW
DELETE FROM supervisor_subordinate AS ss WHERE ss.supervisor_id = OLD.employee_id
