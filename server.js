const mongo = require("mongoose");
const express = require('express');
const app = express();

app.use(express.json());

//db connection
const username = encodeURIComponent(process.env.USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);
mongo.connect(`mongodb+srv://${username}:${password}@${process.env.DATAURL}`)
const db = mongo.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => console.log('connected'));


// routes

// user route
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

//seller routes

const sellersRouter = require('./routes/sellers');
app.use('/sellers', sellersRouter);

// port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('running' + PORT));
