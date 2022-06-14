// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001; // Step 1

const routes = require('./routes/api');
const materiaRoutes=require('./routes/materiaRoutes')
const teacherRoutes=require('./routes/teacherRoutes')
const classesRoutes=require('./routes/classesRoutes')
//const studentsRoutes=require('./routes/studentsRoutes')
const tasksRoutes=require('./routes/tasksRoutes')
const cohorteRoutes=require('./routes/cohorteRoutes')


mongoose.connect("mongodb+srv://AulaVirtual2022:nocountryvirtual@aulavirtual.9kdbn.mongodb.net/test" || 'mongodb://localhost/mern_youtube', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);
app.use('/api', teacherRoutes);
app.use('/api', classesRoutes);
//app.use('/api', studentsRoutes);
app.use('/api', tasksRoutes);
app.use('/mat', materiaRoutes);
app.use('/coho', cohorteRoutes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));