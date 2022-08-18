const express = require('express');
const Product = require('../models/product');
const router = express.Router();


// get all products
router.get('/', async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//get one product
router.get('/:id', getProduct, (req, res) => {
	res.json(res.product);
})

//create one product
router.post('/', async (req, res) => {
	const product = new Product({
		title: req.body.title,
		pics_url: req.body.pics_url,
		seller_id: req.body.seller_id,
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
router.patch('/:id', getProduct, async (req, res) => {
	if (req.body.title != null) {
		res.product.title = req.body.title
	}
	if (req.body.pics_url != null) {
		res.product.pics_url = req.body.pics_url
	}
	if (req.body.seller_id != null) {
		res.product.seller_id = req.body.seller_id
	}
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
	if (req.params.tag != null) {
		res.product.tags = arrRem(res.product.tags, req.params.tag)
		try {
			const upProduct = await res.product.save();
			res.json(upProduct);
		} catch (err) {
			res.status(400).send({message: err.message})
		}
	}
})

//add one request
router.patch('/:id/requests/:requestID', getProduct, async (req, res) => {
	if (req.params.requestID) {
		res.product.tags.push(req.params.requestID);
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
		arrRem(res.product.requests, req.params.requestID)
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



module.exports = router;