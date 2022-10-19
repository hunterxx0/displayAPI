import express from "express";
import {Product} from '../models/product.js';
import {User} from '../models/user.js';
import {Seller} from '../models/seller.js';
import { ObjectID } from 'bson';

import {getOneReq} from '../controllers/getProductReqs/getOneReq.js';
import {getAllReq} from '../controllers/getProductReqs/getAllReq.js';
import {getPage} from '../controllers/getProductReqs/getPage.js';
import {getByTitle} from '../controllers/getProductReqs/getByTitle.js';
import {getByTitleCatg} from '../controllers/getProductReqs/getByTitleCatg.js';
import {getBySellerCatg} from '../controllers/getProductReqs/getBySellerCatg.js';
import {getBySellerName} from '../controllers/getProductReqs/getBySellerName.js';
import {getByCatg} from '../controllers/getProductReqs/getByCatg.js';
import {getCatgSellers} from '../controllers/getProductReqs/getCatgSellers.js';
import {getSellerReq} from '../controllers/getProductReqs/getSellerReq.js';

import {updateProduct} from '../controllers/upProductReq/updateProduct.js';
import {requestAdd, requestDel} from '../controllers/upProductReq/requestFunc.js';
import {createProd} from '../controllers/upProductReq/createProd.js';
import {delProduct} from '../controllers/upProductReq/delProduct.js';

import {getProduct} from '../controllers/utils/getProductByID.js';
import {JWTAuth} from '../controllers/utils/jwtCheck.js';


const router = express.Router();
const jwtKey = process.env.JWTKEY;

// get routes:
//		get one product
router.get('/:id', getProduct, getOneReq);

//		get all products
router.get('/', getAllReq);

//		get products by page
router.get('/page/:number', getPage);

//		get products by title
router.get('/title/:title', getByTitle);

//		get products by title and category
router.get('/title/:title/category/:category', getByTitleCatg);

//		get products by seller and category
router.get('/seller/:seller/category/:category', getBySellerCatg);

//		get products by seller's name
router.get('/seller/:sellerName', getBySellerName);

//		get products by category
router.get('/category/:category', getByCatg);

//		get products sellers of a category
router.get('/sellers/category/:category', getCatgSellers);

//		get seller's requests
router.get('/user/requests', getSellerReq);

// Update routes
//		update one product
router.patch('/:id', getProduct, JWTAuth, updateProduct);

//		add one request
router.patch('/:id/requests/', getProduct, requestAdd);

//		delete one request
router.delete('/:id/requests/:requestID', getProduct, requestDel);

// Create one product
router.post('/', JWTAuth, createProd);

// Delete one product
router.delete('/:id', getProduct, JWTAuth, delProduct);

//		testing
import {pushNotif} from '../controllers/utils/pushNotif.js';
router.get('/test/test/:id', getProduct, async (req, res) => {
	const users = await pushNotif(res.product._id.toString(), "test");

	res.json(users);
})


export {router as productsRouter};