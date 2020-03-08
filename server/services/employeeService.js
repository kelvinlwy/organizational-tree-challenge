const _ = require('lodash');

const flatToHierarchy = (employees) => {

  // Sort employees by position level in ascending order
  const sortEmployeesByLevel = employees.sort((e1, e2) => {
    return e1.position_level - e2.position_level;
  });

  // Group entries with the same supervisor
  // for entries with null supervisor_id, they will be grouped under an object with 'null' as object key
  const nodesBySupervisor = _.groupBy(sortEmployeesByLevel, 'supervisor_id');

  const recursion = (input, key) => {
    const nodes = [];

    if (input.hasOwnProperty(key)) {
      // loop through each employee traversing the output tree
      input[key].forEach(employee => {
        // check if the employee id is the entry of the supervisor nodes
        // retrieve subordinates as child array and attached it to the employee object when subordinates are found
        // otherwise, attach empty array to the employee object.
        const subordinates = (input.hasOwnProperty(employee.id)) ? recursion(input, employee.id) : [];

        nodes.push({
          ...employee,
          subordinates
        })
      });
    }

    return nodes;
  };

  /*
   * The top level of the hierarchy tree are all employees without supervisor
   * All object of employee who is in the supervisor position contain subordinates array property
   * Below is the sample of hierarchy tree:
   *
   * [
   *   {
   *     id: 1
   *     title: CEO
   *     subordinates: [
   *       {
   *          id: 2
   *          title: Manager
   *          subordinates: [
   *            {
   *              id: 54
   *              title: Engineer
   *              subordinates: []
   *              supervisor_id: 2
   *              ...
   *            }
   *          ],
   *          supervisor_id: 1
   *          ...
   *       }
   *     ]
   *     ....
   *   },
   *   {
   *     id: 3
   *     title: Engineer
   *     supervisor_id: null
   *     subordinates: []
   *     ...
   *   }
   * ]
   */
  return recursion(nodesBySupervisor, "null");
};

module.exports = {
  flatToHierarchy
};
