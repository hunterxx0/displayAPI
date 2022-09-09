const express = require('express');
const Product = require('../models/product');
const router = express.Router();


// get all products
router.get('/', async (req, res) => {
	try {
		const products = await Product.find().sort(req.query.sort || 'title');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

// get products by page
router.get('/page/:number', async (req, res) => {
    const page = parseInt(req.params.number, 10) || 0;
	try {
		let sortVal = req.query.sort || 'title';
		const products = await Product.find()
		.sort({ create_at : -1})
		.skip(page * 20)
		.limit(20);
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

// get products by title
router.get('/title/:title', async (req, res) => {
	try {
		const products = await Product.find( {
			"title" : { $regex: req.params.title, $options: 'i'}
		} ).sort(req.query.sort || 'title')
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

// get products by title and category
router.get('/title/:title/category/:category', async (req, res) => {
	try {

		const query = (req.params.category == 'all' ) ? {
			"title" : { $regex: req.params.title, $options: 'i'}} :  {
				"title" : { $regex: req.params.title, $options: 'i'},
				"category": req.params.category
			};
		const page = parseInt(req.query.page, 10) || 0;
		const products = await Product.find( query )
		.skip(page * 10)
		.limit(10)
		.sort(req.query.sort || 'title');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//get one product
router.get('/:id', getProduct, (req, res) => {
	res.json(res.product);
})

//get seller's products
router.get('/seller/:sellerID', async (req, res) => {
	
	try {
		const products = await Product.find({ seller_id: req.params.sellerID })
		.sort(req.query.sort || 'title');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//get products by category
router.get('/category/:category', async (req, res) => {
	
	try {
		const products = await Product.find({ category: req.params.category })
		.sort(req.query.sort || 'title');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//create one product
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

//update one product
router.patch('/:id', getProductUID, async (req, res) => {
	res.product = Object.assign(res.product, req.body);
	try {
		const upProduct = await res.product.save();
		res.json(upProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//delete one product
router.delete('/:id', getProduct, async (req, res) => {
	try {
		await res.product.remove()
		res.json({message: 'Product deleted'});
	} catch (err) {
		res.status(500).json({message: err.message});
	}
	
})


// utilities:

// get product by id function
async function getProduct(req, res, next){
	let product
	try {
		product = await Product.findById(req.params.id)
		if (product == null) {
			return res.status(404).json({message: 'Cannot find product'});
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
	res.product = product;
	next(); 
}

// get product by id function
async function getProductUID(req, res, next){
	let product
	try {
		product = await Product.findOne({_id: req.params.id, seller_id: req.query.seller_id})
		if (product == null) {
			return res.status(404).json({message: "Product doesn't exist or you do not have permissions to change it"});
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
	console.log(product);
	res.product = product;
	next(); 
}

// remove a value from an array
function arrRem(arr, value) {
	return arr.filter(function(ele){ 
        return ele != value; 
    });
}

module.exports = router;