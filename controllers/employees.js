const  Employee = require('../models/employee');
const { Op } = require('sequelize');
 
// CRUD Controlers

//Recuperer tous emlpoyes
exports.getEmployees = (req, res, next) => {
    const creationDateFilter = req.query.creationDate;

    let whereCondition = {}; 

    if (creationDateFilter) {
        whereCondition = {
            createdAt: {
                [Op.gte]: new Date(creationDateFilter)
            }
        };
    }

    Employee.findAll({
        where: whereCondition
    })
        .then(employees => {
            res.status(200).json({ employees: employees })
        })
        .catch(err => console.log(err));
}

//Recuperer emlpoyees par ID
exports.getEmployee = (req, res, next) => {
    const employeeId = req.params.employeeId;
    Employee.findByPk(employeeId)
        .then(employee => {
            if (!employee){
                return res.status(404).json({ message: "Employee n'existe pas!" });
            }
            res.status(200).json({employee: employee})
        })
        .catch(err => console.log(err));
}

//Créer employee
exports.createEmployee = (req, res, next) => {
    const {name, firstName, departement} = req.body;

    Employee.create({
        name: name, 
        firstName: firstName, 
        departement: departement
    })
    .then(result => {
        res.status(201).json({
            message: "Employee créé avec succès",
            employee: result
        })
    })
    .catch(err => console.log(err))
}

//MAJ
exports.updateEmployee = (req, res, next) => {
    const employeId = req.params.employeeId;
    const updateName = req.body.name;
    const updateFirstName = req.body.firstName;
    const updateDepartement = req.body.departement;
    Employee.findByPk(employeId)
        .then(employee => {
            if (!employee){
                return res.status(404).json({ message: "Employee n'existe pas!" });
            }
            employee.name = updateName;
            employee.firstName = updateFirstName,
            employee.departement = updateDepartement;
            return employee.save()
        })
        .then(result => {
            res.status(200).json({message: "Mise à jour succès", employee: result});
        })
        .catch(err => console.log(err))
}

//Suppression
exports.deleteEmplyee = (req, res, next) => {
    const employeeId = req.params.employeeId;
    Employee.findByPk(employeeId)
        .then(employee => {
            if (!employee){
                return res.status(404).json({ message: "Employee n'existe pas!" });
            }
            return Employee.destroy({
                where: {
                    id: employeeId
                }
            })
        })
        .then(result => {
            res.status(200).json({message : 'Employee supprimé'})
        })
        .catch(err => console.log(err))
}

