import mongoose from "mongoose";
import express from "express";
import { urlencoded } from "express";
import cors from "cors";

const app = express();
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
mongoose.connect(url)
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => {
  app.listen(PORT, () => console.log('running ' + PORT));
});

// routes:
//        User route
import {usersRouter} from './routes/users.js';
app.use('/users', usersRouter);

//        Seller routes
import {sellersRouter} from './routes/sellers.js';
app.use('/sellers', sellersRouter);

//        Product routes
import {productsRouter} from './routes/products.js';
app.use('/products', productsRouter);
  
//        Auth routes
import {auth} from './routes/auth.js';
app.use("/auth", auth);

// port
const PORT = process.env.PORT || 3000;
