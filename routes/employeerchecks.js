const controller = require('../controllers/employeeChecks');
const router = require('express').Router();

router.get('/', controller.getEmployeeChecks);
router.post('/add/:employeeId', controller.create);
router.put('/:employeeId', controller.update);

module.exports = router;