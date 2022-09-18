import express from "express";
import {AuthController} from '../controllers/AuthController.js';
import {UserController} from '../controllers/UserController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello');
});
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/role/:userId', UserController.getUserRole);

export {router as auth};
