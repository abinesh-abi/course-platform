const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
var logger = require('morgan');
const { PORT } = require('./config/basicConfig')
const mongodbConnection = require('./config/db');
const basicConfig = require('./config/basicConfig');


const app = express()

app.use(express.json());
app.use(logger('dev'));
app.use(cors({
    origin:[...basicConfig.CLIENT_URL],
    credentials: true,
}))
app.use('/images', express.static('uploads'))

app.use(cookieParser());

// mongodb
mongodbConnection()

// router
app.use('/',require("./routes/userRouter"))

app.listen(PORT,()=>console.log('server running on port '+PORT))