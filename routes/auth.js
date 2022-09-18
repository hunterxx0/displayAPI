import "express";
import * as AuthController from '../controllers/AuthController.js';
import * as UserController from '../controllers/UserController.js';

const router = express();

router.get('/', (req, res) => {
  res.send('Hello');
});
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/role/:userId', UserController.getUserRole);

module.exports = router;
