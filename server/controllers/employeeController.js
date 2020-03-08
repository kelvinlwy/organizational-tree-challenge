const employeeModel = require('../models/employeeModel');
const positionModel = require('../models/positionModel');
const employeeService = require('../services/employeeService');
const positionService = require('../services/positionService');

const listEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.getCurrentEmployees();
    const positions = await positionModel.getPositions();

    const hierarchy = employeeService.flatToHierarchy(JSON.parse(JSON.stringify(employees)));
    const levelGroups = positionService.groupPositionByLevel(JSON.parse(JSON.stringify(positions)));

    res.render('index.ejs', {employees: hierarchy, levels: levelGroups});
  } catch (e) {
    console.error(e);
    res.render('index.ejs', {
      employees: []
    });
  }
};


module.exports = {
  listEmployees
};
