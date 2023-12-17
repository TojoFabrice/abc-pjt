const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const Employee = require('./models/employee');

const app = express();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUTL, DELETE');
    next()
})

app.get('/', (req, res, next) => {
    res.send('Hello word')
})

app.use('/employees', require('./routes/employees'));
app.use('/employeechecks', require('./routes/employeerchecks'));

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message})
})

sequelize
    .sync()
    .then(res => {
        console.log("base connecté");
        app.listen(3000)
    })
    .catch(e => console.log(e))