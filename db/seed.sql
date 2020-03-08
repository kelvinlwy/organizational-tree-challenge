USE company;

INSERT INTO position (id, title, level) VALUES
(1, 'CEO', 1),
(2, 'MANAGER', 2),
(3, 'ENGINEER', 3);

INSERT INTO employee (id, first_name) VALUES
(1, 'Alan'),
(2, 'Martin'),
(3, 'Jamie'),
(4, 'Alex'),
(5, 'Steve'),
(6, 'David');

INSERT INTO employee_position (employee_id, position_id) VALUES
(1, 2),
(2, 3),
(3, 1),
(4, 3),
(5, 2),
(6, 3);

INSERT INTO supervisor_subordinate (supervisor_id, employee_id) VALUES
(3, 1),
(3, 5),
(1, 2),
(1, 4),
(5, 6);
