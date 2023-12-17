const controller = require('../controllers/employees');
const router = require('express').Router();

router.get('/', controller.getEmployees);
router.get('/:employeeId', controller.getEmployee);
router.post('/', controller.createEmployee);
router.put('/:employeeId', controller.updateEmployee);
router.delete('/:employeeId', controller.deleteEmplyee)

module.exports = router;