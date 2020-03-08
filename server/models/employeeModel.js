const pool = require('../loaders/db');

/**
 * @typedef Employee
 * @property {number} id - The employee's id
 * @property {string} first_name - The employee's first name
 * @property {string} last_name - The employee's last name
 * @property {string} title - The employee's position title
 * @property {number} position_level - The employee's current position level
 * @property {number} supervisor_id - The ID of employee's supervisor
 */
/**
 * Retrieve a collection of current employees including
 * employee's name, position details, and associated valid supervisor.
 *
 * For the supervisor who is not employee anymore or his/her's position level is lower than the subordinate's,
 * he/she is not a valid supervisor of the subordinate.
 *
 * @returns {Promise<Employee[]>} A collection of employees
 */
async function getCurrentEmployees() {
  try {
    const [rows] = await pool.query(
      'SELECT e.first_name, e.last_name, e.id, p.title, p.level as position_level, supervisor.supervisor_id FROM employee AS e ' +
      'LEFT JOIN employee_position AS ep ON ep.employee_id = e.id ' +
      'LEFT JOIN position AS p ON ep.position_id = p.id ' +
      'LEFT JOIN ' +
      '   (SELECT ss.employee_id, ss.supervisor_id, s_pos.level AS s_level, e_pos.level AS e_level ' +
      '   FROM supervisor_subordinate AS ss ' +
      '   LEFT JOIN employee ON employee.id = ss.supervisor_id ' +
      '   LEFT JOIN employee_position AS ep ON ss.employee_id = ep.employee_id ' +
      '   LEFT JOIN position AS e_pos ON ep.position_id = e_pos.id ' +
      '   LEFT JOIN employee_position AS sp ON ss.supervisor_id = sp.employee_id ' +
      '   LEFT JOIN position AS s_pos ON sp.position_id = s_pos.id ' +
      '   WHERE employee.end_date IS NULL OR employee.end_date > CURDATE() ' +
      '   HAVING s_level < e_level ' +
      '   ) AS supervisor ' +
      'ON supervisor.employee_id = e.id ' +
      'WHERE e.end_date IS NULL OR e.end_date > CURDATE()' +
      'ORDER BY p.level');
    return rows;
  } catch (e) {
    console.error(e);
    return [];
  }
}

module.exports = {
  getCurrentEmployees
};
