import express from "express";

import { User } from '../models/user.js';

import { getUsers } from '../controllers/userReqsHandler/getUsers.js';
import { addRecSear } from '../controllers/userReqsHandler/addRecSear.js';
import { delRecSear } from '../controllers/userReqsHandler/delRecSear.js';
import { clrRecView } from '../controllers/userReqsHandler/clrRecView.js';
import { clrRecSear } from '../controllers/userReqsHandler/clrRecSear.js';
import { delRecView } from '../controllers/userReqsHandler/delRecView.js';
import { addFav } from '../controllers/userReqsHandler/addFav.js';
import { delFav } from '../controllers/userReqsHandler/delFav.js';
import { addRequest } from '../controllers/userReqsHandler/addRequest.js';
import { delRequest } from '../controllers/userReqsHandler/delRequest.js';
import { addFallow } from '../controllers/userReqsHandler/addFallow.js';
import { delFallow } from '../controllers/userReqsHandler/delFallow.js';
import { clrFallow } from '../controllers/userReqsHandler/clrFallow.js';
import { getFollowing } from '../controllers/userReqsHandler/getFollowing.js';

import { arrRem } from '../controllers/utils/arrRem.js';
import { getUser } from '../controllers/utils/getUser.js';
import { delNotif } from '../controllers/utils/delNotif.js';
import { clrNotif } from '../controllers/utils/clrNotif.js';
import { getAllNotif } from '../controllers/utils/getAllNotif.js';
import { getUnreadNotif } from '../controllers/utils/getUnreadNotif.js';
import { readNotif } from '../controllers/utils/readNotif.js';

const router = express.Router();

// get all
router.get('/', getUsers);

//get one
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

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

//delete notification
router.delete('/:id/notification/:notifID', getUser, delNotif);

//get all notifications
router.get('/:id/notifications/', getUser, getAllNotif);

//get unread notifications
router.get('/:id/notifications/unread', getUser, getUnreadNotif);

//read notification
router.patch('/:id/notifications/:notifID', getUser, readNotif);

//clear notifications
router.delete('/:id/clr/notification', getUser, clrNotif);

//add follow to seller
router.patch('/:id/follow/:sellerName', getUser, addFallow);

//delete follow to seller
router.delete('/:id/follow/:sellerName', getUser, delFallow);

//clear follow list
router.delete('/:id/clr/follow', getUser, clrFallow);

//get following list
router.get('/:id/following', getUser, getFollowing);

export { router as usersRouter };