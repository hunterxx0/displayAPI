import express from "express";
import {Product} from '../models/product.js';
import {User} from '../models/user.js';
import { ObjectID } from 'bson';
import jwt from 'jsonwebtoken';


const { verify } = jwt;
const router = express.Router();
const jwtKey = process.env.JWTKEY;

// get routes:
//		get all products
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 20;
    const sortRev = parseInt(req.query.reverse, 10) || -1;
    const sortVal = req.query.sort || 'title';
	try {
		const products = await Product.find()
		.select('-seller_id')
		.sort({ [sortVal] : sortRev})
		.limit(limit);
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//		get products by page
router.get('/page/:number', async (req, res) => {
    const page = parseInt(req.params.number, 10) || 1;
	if (page <= 0) return res.status(400).json({message: 'Bad Request'});
    const limit = parseInt(req.query.limit, 10) || 20;
    const sortRev = parseInt(req.query.reverse, 10) || -1;
    const sortVal = req.query.sort || 'title';
    const result = {}
	try {
		const products = await Product.find()
		.select('-seller_id')
		.sort({ [sortVal] : sortRev})
		.skip((page - 1) * limit)
		.limit(limit);
		const productsCount = await Product.find().count();
		result.totalpages = Math.floor(productsCount/limit);
		if (productsCount%limit) result.totalpages += 1;
		if (page > result.totalpages || page < 0) throw 'Bad Request';
		result.nextPage = (page == result.totalpages) ? null : page + 1;
		result.prevPage = (page == 1) ? null : page - 1;
		result.data = products;
		res.json(result);
	} catch (err) {
		if (err.message == 'Bad Request') res.status(400).json({message: err.message});
		res.status(500).json({message: err.message});
	}
})

//		get products by title
router.get('/title/:title', async (req, res) => {
	try {
		const products = await Product.find( {
			"title" : { $regex: req.params.title, $options: 'i'}
		} ).sort(req.query.sort || 'title')
		.select('-seller_id');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//		get products by title and category
router.get('/title/:title/category/:category', async (req, res) => {
	try {

		const query = (req.params.category == 'all' ) ? {
			"title" : { $regex: req.params.title, $options: 'i'}} :  {
				"title" : { $regex: req.params.title, $options: 'i'},
				"category": req.params.category
			};
		const page = parseInt(req.query.page, 10) || 0;
		const products = await Product.find( query )
		.select('-seller_id')
		.skip(page * 10)
		.limit(10)
		.sort(req.query.sort || 'title');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//		get products by seller and category
router.get('/seller/:seller/category/:category', async (req, res) => {
	try {
		const query = {
				"seller_name" : req.params.seller,
				"category": req.params.category
			};
		const products = await Product.find( query )
		.sort(req.query.sort || 'title')
		.select('-seller_id');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//		get one product
router.get('/:id', getProduct, (req, res) => {
	res.json(res.product);
})

//		get seller's products by name
router.get('/seller/:sellerName', async (req, res) => {
    const page = parseInt(req.query.page, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 20;
    const sortRev = parseInt(req.query.reverse, 10) || -1;
    const sortVal = req.query.sort || 'title';
	try {
		const products = await Product.find({ seller_name: req.params.sellerName })
		.sort({ [sortVal] : sortRev})
		.select('-seller_id')
		.skip(page * limit)
		.limit(limit);
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//		get products by category
router.get('/category/:category', async (req, res) => {
	
	try {
		const products = await Product.find({ category: req.params.category })
		.select('-seller_id')
		.sort(req.query.sort || 'title');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//		get products sellers of a category
router.get('/sellers/category/:category', async (req, res) => {
	try {
		const products = await Product.find({"category": req.params.category})
		.select('seller_name -_id');
		/*
		const result = [...new Set(products.map(a => a.seller_name))];
		*/
		res.json(result);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//		get seller's requests
router.get('/user/requests', async (req, res) => {
	let requests = req.body.requests
	try {
		if (!requests) throw 'No requests';
		const products = await Product.find({"requests.id": { $in: requests}})
		.select('-seller_id')
		let result = products.map(a => a.requests.filter(request => requests.includes(request.id) ));
		result = [...new Set(result)].flat();
		res.json(result);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

// Update routes
//		update one product
router.patch('/:id', getProductUID, async (req, res) => {
	res.product = Object.assign(res.product, req.body);
	try {
		const upProduct = await res.product.save();
		res.json(upProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//		add one request
import {requestAdd} from '../controllers/requestFunc.js';
router.patch('/:id/requests/', getProduct, requestAdd);

//		delete one request
import {requestDel} from '../controllers/requestFunc.js';
router.delete('/:id/requests/:requestID', getProduct, requestDel);


// other routes
//		create one product
router.post('/', async (req, res) => {
	const product = new Product({
		title: req.body.title,
		pics_url: req.body.pics_url,
		seller_name: req.body.seller_name,
		category: req.body.category,
		descriptions: req.body.descriptions,
		tags: req.body.tags,
		requests: req.body.requests,
		characteristics: req.body.characteristics,
	})
	try {
		const newProduct = await product.save();
		res.status(201).json(newProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//		delete one product
router.delete('/:id', getProduct, async (req, res) => {
	try {
		await res.product.remove()
		res.json({message: 'Product deleted'});
	} catch (err) {
		res.status(500).json({message: err.message});
	}
	
})

//		testing
router.get('/test/test', JWTAuth, async (req, res) => {
	res.json({message: 'working good'});
})


//utilities:

//		get product by id function
async function getProduct(req, res, next){
	let product
	try {
		product = await Product.findById(req.params.id)
		.select('-seller_id');
		if (product == null) {
			return res.status(404).json({message: 'Cannot find product'});
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
	res.product = product;
	next(); 
}

//		get product by id function
async function getProductUID(req, res, next){
	let product
	try {
		let query = {_id: ObjectID(req.params.id), seller_id: ObjectID(req.query.seller_id)};
		console.log(query);
		product = await Product.findOne(query).select('-seller_id');
		console.log(product);		
		if (product == null) {
			return res.status(404).json({message: "Product doesn't exist or you do not have permissions to change it"});
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
	res.product = product;
	next(); 
}

//		get product by id function
async function userVal(req, res, next){
	let user
	try {
		user = await User.findOne(token);
		console.log(user);		
		if (user == null) {
			return res.status(401).json({message: "Unauthorized user"});
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
	next(); 
}

//		JWT check
function JWTAuth(req, res, next){
	let token = req.headers['authorization'];
	console.log("token:");
	console.log(token);
	if (!token) return res.status(401).json({message: "Unauthorized"});
	token = token.slice(7);
	console.log("Stoken:");
	console.log(token);

	verify(token, jwtKey, (err, decoded) => {
        if (err) {
          console.log(`JWT Error: ${err}`);
          return res.status(401).json({message: "Unauthorized"});
        }
        console.log("ccccccccccc:");
        console.log(credentials);
        console.log("dddddddddddddd:");
        console.log(decoded);

    });
    next(); 
}

//		remove a value from an array
function arrRem(arr, value) {
	return arr.filter(function(ele) { 
        return ele != value; 
    });
}

export {router as productsRouter};