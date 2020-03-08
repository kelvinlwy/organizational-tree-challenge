const _ = require('lodash');

/**
 * Group position by level by generating new collection of positions
 * using corresponding value of each 'level' key from original array as the key being used in result array.
 */
const groupPositionByLevel = (postions) => {
  return _.omit(_.groupBy(postions, 'level'), ['undefined']);
};

module.exports = {
  groupPositionByLevel
};
