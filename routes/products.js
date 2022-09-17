const express = require('express');
const Product = require('../models/product');
const { v4 } = require('uuid');

const router = express.Router();

// get routes:
//		get all products
router.get('/', async (req, res) => {
	try {
		const products = await Product.find()
		.select('-seller_id')
		.sort(req.query.sort || 'title');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//		get products by page
router.get('/page/:number', async (req, res) => {
    const page = parseInt(req.params.number, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 20;
    const sortRev = parseInt(req.query.reverse, 10) || -1;
    const sortVal = req.query.sort || 'title';
	try {
		
		const products = await Product.find()
		.select('-seller_id')
		.sort({ [sortVal] : sortRev})
		.skip(page * limit)
		.limit(limit);
		res.json(products);
	} catch (err) {
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
		res.json(products.map(a => a.seller_name));
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
router.patch('/:id/requests/', getProduct, async (req, res) => {
	let request = req.body;
	const myuuid = v4();
	request.id = myuuid;
	res.product.requests.push(request);
	try {
		const upProduct = await res.product.save();
		res.json(upProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}

})

//		delete one request
router.delete('/:id/requests/:requestID', getProduct, async (req, res) => {
	if (req.params.requestID != null) {
		res.product.requests = res.product.requests.filter( obj => obj.id !== req.params.requestID)
		try {
			const upProduct = await res.product.save();
			res.json(upProduct);
		} catch (err) {
			res.status(400).send({message: err.message})
		}
	}
})


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
		product = await Product.findOne({_id: req.params.id, seller_id: req.query.seller_id})
		.select('-seller_id');
		if (product == null) {
			return res.status(404).json({message: "Product doesn't exist or you do not have permissions to change it"});
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
	res.product = product;
	next(); 
}

//		remove a value from an array
function arrRem(arr, value) {
	return arr.filter(function(ele){ 
        return ele != value; 
    });
}

module.exports = router;