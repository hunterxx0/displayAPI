const mongo = require("mongoose");
const express = require('express');
const { urlencoded } = require("express");
const app = express();
const cors = require("cors");

app.use( cors() );
app.use( express.json() );
app.use( urlencoded({ extended: true }) );
/**
// Twilio
const twilPost = require('./controllers/twilPost')
app.post("/", twilPost);
*/
//db connection
const username = encodeURIComponent(process.env.USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);
const url = `mongodb+srv://${username}:${password}@${process.env.DATAURL}`;
mongo.connect(url)
const db = mongo.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => {
  app.listen(PORT, () => console.log('running ' + PORT));
});

// routes:
//        User route
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

//        Seller routes
const sellersRouter = require('./routes/sellers');
app.use('/sellers', sellersRouter);

//        Product routes
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

//        Auth routes
const auth = require('./routes/auth');
app.use("/auth", auth);

// port
const PORT = process.env.PORT || 3000;
