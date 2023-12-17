const EmployeeCheck = require('../models/employeeCheck')
const Employee = require('../models/employee')


//Recuperer tous check list
exports.getEmployeeChecks = (req, res, next) => {
    EmployeeCheck.findAll()
        .then(employeeChecks => {
            res.status(200).json({ employeeChecks: employeeChecks })
        })
        .catch(err => console.log(err));
}

//creer checkIN
exports.create = (req, res, next) => {
    const comment = req.body.comment;
    const employeeId = req.params.employeeId;
    const checkInTime = new Date();

    //ajout new checkIn
    EmployeeCheck.create({
        employeeId,
        checkin: checkInTime,
        comment
    })
        .then(result => {
            console.log('Created checkin');
            res.status(201).json({
                message: "EmployeeCheck checkIn créé avec succès",
                employee: result
            })
        })
        .catch(err => console.log(err))
}

//update check (CHECKOUT)
exports.update = async (req, res, next) => {
    const employeeId = req.params.employeeId;

    try {
        // Recherche de l'employé par son ID
        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee n'existe pas!" });
        }

        // Recherche de l'EmployeeCheck associé à l'employé
        const employeecheck = await EmployeeCheck.findOne({ where: { employeeId: employeeId } });
        if (!employeecheck) {
            return res.status(404).json({ message: "EmployeeCheck n'existe pas!" });
        }

        const checkOutTime = new Date();
        const updateComment = req.body.comment;

        const checkInTime = employeecheck.checkin;

        // Calcul de la durée
        const durationInMilliseconds = checkOutTime - checkInTime;
        const durationInSeconds = Math.floor(durationInMilliseconds / 1000);

        // Mise à jour des propriétés de l'employeecheck
        employeecheck.checkout = checkOutTime;
        employeecheck.comment = updateComment;
        employeecheck.duration = durationInSeconds;

        // Enregistrement des modifications dans la base de données
        const result = await employeecheck.save();

        res.status(200).json({ message: "Mise à jour réussie", employeecheck: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
    }
};
