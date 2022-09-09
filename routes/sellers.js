const express = require('express');
const Seller = require('../models/seller');

const router = express.Router();

// get all
router.get('/', async (req, res) => {
	try {
		const sellers = await Seller.find().sort(req.query.sort || 'name');
		let jsonObj = JSON.parse(JSON.stringify(sellers));
		console.log(jsonObj);
		jsonObj.forEach(function(v){ delete v["_id"]; delete v["__v"]; });
		res.json(jsonObj);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//get seller by id
router.get('/:id', getSeller, (req, res) => {
	let jsonObj = res.seller.toJSON();
	delete jsonObj["_id"];
	delete jsonObj["__v"]; 
	res.json(jsonObj);
})

//get seller by name
router.get('/name/:name', getSeller, (req, res) => {
	let jsonObj = res.seller.toJSON();
	delete jsonObj["_id"];
	delete jsonObj["__v"]; 
	res.json(jsonObj);
})

//create one
router.post('/', async (req, res) => {
	const seller = new Seller({
		name: req.body.name,
		email: req.body.email,
		phone_number: req.body.phone_number,
		seller_country: req.body.seller_country,
		website: req.body.website,
	})
	try {
		const newSeller = await seller.save();
		res.status(201).json(newSeller);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//update one
router.patch('/:id', getSeller, async (req, res) => {
	res.seller = Object.assign(res.product, req.body);
	try {
		const upSeller = await res.seller.save();
		res.json(upSeller);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//delete one
router.delete('/:id', getSeller, async (req, res) => {
	try {
		await res.seller.remove()
		res.json({message: 'Seller deleted'});
	} catch (err) {
		res.status(500).json({message: err.message});
	}
	
})

// utilities:

// get product by id or name function
async function getSeller(req, res, next){
	let seller = null;
	try {
		if (req.params.id) {
			seller = await Seller.findById(req.params.id);
		} else if ( req.params.name ) {
			seller = await Seller.findOne({name: req.params.name});
		}
		if (seller == null) {
			return res.status(404).json({message: 'Cannot find seller'});
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
	res.seller = seller;
	next(); 
}

module.exports = router;