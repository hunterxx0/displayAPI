import express from "express";

import { Seller } from '../models/seller.js';

import { sellerAll } from '../controllers/sellerReqsHandler/sellerAll.js';
import { sellerCreate } from '../controllers/sellerReqsHandler/sellerCreate.js';
import { sellerUpdate } from '../controllers/sellerReqsHandler/sellerUpdate.js';
import { sellerDel } from '../controllers/sellerReqsHandler/sellerDel.js';
import { delNotif } from '../controllers/sellerReqsHandler/delNotif.js';
import { clrNotif } from '../controllers/sellerReqsHandler/clrNotif.js';
import { readNotif } from '../controllers/utils/readNotif.js';

import { getSeller } from '../controllers/utils/getSeller.js';

const router = express.Router();

// get seller by id
router.get('/:id', getSeller, (req, res) => {
    res.json(res.seller);
});

// get seller by name
router.get('/name/:name', getSeller, (req, res) => {
    res.json(res.seller);
});

// get all
router.get('/', sellerAll);

// create one
router.post('/', sellerCreate);

//update one
router.patch('/:id', getSeller, sellerUpdate)

//delete one
router.delete('/:id', getSeller, sellerDel);

//delete notification
router.delete('/:id/notification/:notifID', getSeller, delNotif);

//clear notifications
router.delete('/:id/clr/notification', getSeller, clrNotif);

//read notification
router.patch('/:id/notifications/:notifID', getSeller, readNotif);

export { router as sellersRouter };