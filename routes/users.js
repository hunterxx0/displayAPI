import express from "express";

import {User} from '../models/user.js';

import {getUsers} from '../controllers/userReqsHandler/getUsers.js';
import {addRecSear} from '../controllers/userReqsHandler/addRecSear.js';
import {delRecSear} from '../controllers/userReqsHandler/delRecSear.js';
import {clrRecSear} from '../controllers/userReqsHandler/clrRecSear.js';
import {delRecView} from '../controllers/userReqsHandler/delRecView.js';
import {addFav} from '../controllers/userReqsHandler/addFav.js';
import {delFav} from '../controllers/userReqsHandler/delFav.js';
import {addRequest} from '../controllers/userReqsHandler/addRequest.js';
import {delRequest} from '../controllers/userReqsHandler/delRequest.js';

import {arrRem} from '../controllers/utils/arrRem.js';
import {getUser} from '../controllers/utils/getUser.js';

const router = express.Router();

// get all
router.get('/', getUsers);

//get one
router.get('/:id', getUser, (req, res) => {
	res.json(res.user);
})

//add recently searched word
router.patch('/:id/search/:keyword', getUser, addRecSear);

//delete recently searched word
router.delete('/:id/search/delete/:keyword', getUser, delRecSear);

//clear recently searched
router.delete('/:id/search/clear', getUser, clrRecSear);

//delete recently viewed product
router.delete('/:id/views/delete/:productID', getUser, delRecView);

//clear recently viewed products
router.delete('/:id/views/clear', getUser, clrRecView);

//add favorite
router.patch('/:id/favorites/:favorite', getUser, addFav);

//delete favorites
router.delete('/:id/favorites/:favorite', getUser, delFav);

//add request
router.patch('/:id/requests/:requestID', getUser, addRequest);

//delete request
router.delete('/:id/requests/:requestID', getUser, delRequest);


export {router as usersRouter};