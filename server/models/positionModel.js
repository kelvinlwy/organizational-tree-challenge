const pool = require('../loaders/db');

/**
 * @typedef Position
 * @property {number} level - The position level under the organizational tree
 * @property {string} title - The position title
 */
/**
 * Retrieve a collection of company positions sorted by level in ascending order
 *
 * @returns {Promise<Position[]>} A collection of positions
 */
async function getPositions() {
  try {
    const [rows] = await pool.query(
      'SELECT p.level, p.title FROM position AS p ORDER BY p.level'
    );
    return rows;
  } catch (e) {
    console.error(e);
    return [];
  }
}

module.exports = {
  getPositions
};
