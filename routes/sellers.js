const express = require('express');
const Seller = require('../models/seller');

const router = express.Router();

// get all
router.get('/', async (req, res) => {
	try {
		const sellers = await Seller.find().sort(req.query.sort || 'name');
		res.json(sellers);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//get seller by id
router.get('/:id', getSeller, (req, res) => {
	res.json(res.seller);
})

//get seller by name
router.get('/name/:name', getSeller, (req, res) => {
	res.json(res.seller);
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
	if (req.body.name != null) {
		res.seller.name = req.body.name
	}

	if (req.body.email != null) {
		res.seller.email = req.body.email
	}
	if (req.body.phone_number != null) {
		res.seller.phone_number = req.body.phone_number
	}
	if (req.body.website != null) {
		res.seller.website = req.body.website
	}
	if (req.body.seller_country != null) {
		res.seller.seller_country = req.body.seller_country
	}
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
	delete seller["_id"]; 
	res.seller = seller;
	next(); 
}

module.exports = router;