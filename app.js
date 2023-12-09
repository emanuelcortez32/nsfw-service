const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const actuator = require('express-actuator');
const helmet = require('helmet');
const listEndpoints = require('express-list-endpoints')

const {name, version} = require('./package.json');
const nsfwRouter = require('./src/routes/nsfwRoute');

const BASE_PATH = "/nsfw";
const PORT = 8080;
const app = express();

//Middlewares
app.use(helmet());
app.use(actuator({basePath: BASE_PATH}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


//Routes
app.use(BASE_PATH, nsfwRouter);

app.listen(PORT, () => {
    console.log(`${name} ${version} is running on port: ${PORT}!!`);
    console.log(listEndpoints(app));
});
