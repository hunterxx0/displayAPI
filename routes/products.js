const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// get all
router.get('/', async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//get one
router.get('/:id', getProduct, (req, res) => {
	res.json(res.products);
})

//create one
router.post('/', async (req, res) => {
	const product = new Product({
		title: req.body.title,
		status: req.body.status,
		seller_id: req.body.seller_id,
		tags: req.body.tags,
		requests: req.body.requests,
	})
	try {
		const newProduct = await product.save();
		res.status(201).json(newProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//update one
router.patch('/:id', getProduct, async (req, res) => {
	if (req.body.name != null) {
		res.product.title = req.body.title
	}

	if (req.body.status != null) {
		res.product.status = req.body.status
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
router.post('/:id/tags', getProduct, async (req, res) => {

})

//delete tags
router.delete('/:id/tags', getProduct, async (req, res) => {

})

//add requests
router.post('/:id/tags', getProduct, async (req, res) => {

})

//delete requests
router.delete('/:id/tags', getProduct, async (req, res) => {

})


//delete one
router.delete('/:id', getProduct, async (req, res) => {
	try {
		await res.product.remove()
		res.json({message: 'Product deleted'});
	} catch (err) {
		res.status(500).json({message: err.message});
	}
	
})

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

module.exports = router;