import * as mongo from "mongoose";
import "express";
import { urlencoded } from "express";
import "cors";

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
mongo.connect(url)
const db = mongo.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => {
  app.listen(PORT, () => console.log('running ' + PORT));
});

// routes:
//        User route
import * as usersRouter from './routes/users';
app.use('/users', usersRouter);

//        Seller routes
import * as sellersRouter from './routes/sellers';
app.use('/sellers', sellersRouter);

//        Product routes
import * as productsRouter from './routes/products';
app.use('/products', productsRouter);

//        Auth routes
import * as auth from './routes/auth';
app.use("/auth", auth);

// port
const PORT = process.env.PORT || 3000;
