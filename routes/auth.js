import "express";
import {AuthController} from '../controllers/AuthController';
import {UserController} from '../controllers/UserController';

const router = express();

router.get('/', (req, res) => {
  res.send('Hello');
});
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/role/:userId', UserController.getUserRole);

module.exports = router;
