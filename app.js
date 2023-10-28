const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const actuator = require('express-actuator');
const helmet = require('helmet');
const {name, version} = require('./package.json');
const nsfwRouter = require('./src/routes/nsfwRoute');

const PORT = 8080;
const app = express();

//Middlewares
app.use(helmet());
app.use(actuator());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


//Routes
app.use('/nsfw', nsfwRouter);

app.listen(PORT, () => {
    console.log(`${name} ${version} is running on port: ${PORT}!!`);
});
