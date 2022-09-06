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
		const products = await Product.find()
		.skip(page * 20)
		.limit(20)
		.sort(req.query.sort || 'title');
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
		seller_id: req.body.seller_id,
		category: req.body.category,
		descriptions: req.body.descriptions,
		tags: req.body.tags,
		requests: req.body.requests,
		Characteristics: req.body.Characteristics,
	})
	try {
		const newProduct = await product.save();
		res.status(201).json(newProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//update one product
router.put('/:id', getProduct, async (req, res) => {
	console.log(req.body);
	res.product = updateObj(res.product, req.body);
	try {
		const upProduct = await res.product.save();
		res.json(upProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})


//add urls
router.patch('/:id/pic', getProduct, async (req, res) => {
	let arr = req.body.tags;
	if (arr != null) {
		for( let i = 0; i < arr.length; i++){ 
			res.product.tags.push(arr[i]);
	    }
		try {
			const upProduct = await res.product.save();
			res.json(upProduct);
		} catch (err) {
			res.status(400).send({message: err.message})
		}
	}
})

//delete one url
router.delete('/:id/pic', getProduct, async (req, res) => {
	res.product.tags = arrRem(res.product.tags, req.params.tag)
	try {
		const upProduct = await res.product.save();
		res.json(upProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})


//add tags
router.patch('/:id/tags', getProduct, async (req, res) => {
	let arr = req.body.tags;
	if (arr != null) {
		for( let i = 0; i < arr.length; i++){ 
			res.product.tags.push(arr[i]);
	    }
		try {
			const upProduct = await res.product.save();
			res.json(upProduct);
		} catch (err) {
			res.status(400).send({message: err.message})
		}
	}
})

//delete one tag
router.delete('/:id/tags/:tag', getProduct, async (req, res) => {
	res.product.tags = arrRem(res.product.tags, req.params.tag)
	try {
		const upProduct = await res.product.save();
		res.json(upProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//add one request
router.patch('/:id/requests/:requestID', getProduct, async (req, res) => {
	if (req.params.requestID && req.body) {
		let obj = {};
		obj[req.params.requestID] = req.body;
		res.product.requests.push(obj);
		try {
			const upProduct = await res.product.save();
			res.json(upProduct);
		} catch (err) {
			res.status(400).send({message: err.message})
		}
	}

})

//delete one request
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

// remove a value from an array
function arrRem(arr, value) {
	return arr.filter(function(ele){ 
        return ele != value; 
    });
}

// object update
function updateObj(obj, upBody) {
    for (const [key, val] of Object.entries(upBody)) {

        if (typeof val == "object")
        	console.log(`key:${key}*\nval:${val}*\n`);
            updateObj(obj[key], val);
        else
            obj[key] = val;
    }
    return obj;
}



module.exports = router;