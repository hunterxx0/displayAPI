const mongo = require("mongoose");
const express = require('express');
const app = express();
const cors = require("cors");
// port
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//db connection
const username = encodeURIComponent(process.env.USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);
const url = `mongodb+srv://${username}:${password}@${process.env.DATAURL}`;
mongo.connect(url)
const db = mongo.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => {
  app.listen(PORT, () => console.log('running' + PORT));
});

// routes:
// user route
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

//seller routes
const sellersRouter = require('./routes/sellers');
app.use('/sellers', sellersRouter);

//product routes
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);
