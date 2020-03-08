USE company;

INSERT INTO position (id, title, level) VALUES
(1, 'CEO', 1),
(2, 'CTO', 1),
(3, 'Manager', 2),
(4, 'Engineer', 3),
(5, 'Intern', 4),
(6, 'HR', 4);

INSERT INTO employee (id, first_name) VALUES
(1, 'Alan'),
(2, 'Martin'),
(3, 'Jamie'),
(4, 'Alex'),
(5, 'Steve'),
(6, 'David'),
(7, 'John'),
(8, 'Keith'),
(9, 'Kelly'),
(10, 'Judy'),
(11, 'Sabrina'),
(12, 'Janice'),
(13, 'Daniel'),
(14, 'Danis'),
(15, 'Emma');

INSERT INTO employee (id, first_name, end_date) VALUES
(16, 'Josh', '2019-03-08 08:40:21');

INSERT INTO employee_position (employee_id, position_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 3),
(5, 3),
(6, 3),
(7, 4),
(8, 4),
(9, 4),
(10, 4),
(11, 5),
(12, 5),
(13, 4),
(14, 5),
(15, 6),
(16, 3);

INSERT INTO supervisor_subordinate (supervisor_id, employee_id) VALUES
(1, 3),
(1, 5),
(2, 4),
(2, 6),
(3, 7),
(4, 8),
(5, 9),
(6, 10),
(3, 11),
(4, 12),
(1, 16),
(16, 13),
(16, 14);

