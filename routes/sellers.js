import express from "express";

import { Seller } from '../models/seller.js';

import { sellerAll } from '../controllers/sellerReqsHandler/sellerAll.js';
import { getSellersByPage } from '../controllers/sellerReqsHandler/getSellersByPage.js';
import { getFollowers } from '../controllers/sellerReqsHandler/getFollowers.js';
import { planUpgrade } from '../controllers/sellerReqsHandler/planUpgrade.js';


import { getSeller } from '../controllers/utils/getSeller.js';
import { delNotif } from '../controllers/utils/delNotif.js';
import { clrNotif } from '../controllers/utils/clrNotif.js';
import { getAllNotif } from '../controllers/utils/getAllNotif.js';
import { getUnreadNotif } from '../controllers/utils/getUnreadNotif.js';
import { readNotif } from '../controllers/utils/readNotif.js';
import { JWTAuth } from '../controllers/utils/jwtCheck.js';

const router = express.Router();

// get seller by id
router.get('/:id', getSeller, (req, res) => {
    res.json(res.seller);
});

// get seller by name
router.get('/name/:name', getSeller, (req, res) => {
    res.json(res.seller);
});

// get all By Page
router.get('/page/:number', getSellersByPage);

// get all
router.get('/', sellerAll);

//get all notifications
router.get('/:id/notifications/', getSeller, getAllNotif);

//get unread notifications
router.get('/:id/notifications/unread', getSeller, getUnreadNotif);

//delete notification
router.delete('/:id/notification/:notifID', getSeller, delNotif);

//clear notifications
router.delete('/:id/clr/notification', getSeller, clrNotif);

//read notification
router.patch('/:id/notifications/:notifID', getSeller, readNotif);

//upgrade plan
router.patch('/:name/upgrade/:plan', getSeller, JWTAuth, planUpgrade);

//get followers list
router.get('/:name/followers', getSeller, getFollowers);



export { router as sellersRouter };