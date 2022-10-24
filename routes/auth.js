import express from "express";
import {AuthController} from '../controllers/auth/AuthController.js';
import {encrDecr} from '../controllers/auth/encrDecr.js';

const router = express.Router();

router.get('/:word', (req, res) => {
  const word = (req.params.word) ? encrDecr(req.params.word, req.query.op) : null
  res.json({ word });
});
router.post('/signupSeller', AuthController.sellerSignup);
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.patch('/editlogin', AuthController.editLogin);
router.delete('/eraseUser/:id', AuthController.deleteUser);

/*
import {UserController} from '../controllers/UserController.js';
router.get('/role/:userId', UserController.getUserRole);
*/
export {router as auth};
