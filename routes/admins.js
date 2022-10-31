import express from "express";

import { createAdmin } from '../controllers/adminReqsHandler/createAdmin.js';
import { getAdminLogs } from '../controllers/adminReqsHandler/getAdminLogs.js';
import { clrAdminLogs } from '../controllers/adminReqsHandler/clrAdminLogs.js';

import { JWTAuth } from '../controllers/utils/jwtCheck.js';

const router = express.Router();

//get all notifications
router.post('/', createAdmin);

//get all notifications
router.get('/:id/logs/', JWTAuth, getAdminLogs);

//clear notifications
router.delete('/:id/clr/logs', JWTAuth, clrAdminLogs);


export { router as adminRouter };