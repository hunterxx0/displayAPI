const express = require('express');
const User = require('../models/user');

const router = express.Router();

// get all
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
})

//get one
router.get('/:id', getUser, (req, res) => {
	res.json(res.user);
})

//create one
router.post('/', async (req, res) => {
	const user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phone_number: req.body.phone_number,
		favorites: req.body.favorites,
	})
	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//update one
router.patch('/:id', getUser, async (req, res) => {
	if (req.body.firstName != null) {
		res.user.firstName = req.body.firstName
	}
	if (req.body.lastName != null) {
		res.user.lastName = req.body.lastName
	}
	if (req.body.email != null) {
		res.user.email = req.body.email
	}
	if (req.body.phone_number != null) {
		res.user.phone_number = req.body.phone_number
	}
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//add favorites
router.post('/:id/favorites', getUser, (req, res) => {

})

//delete favorites
router.delete('/:id/favorites', getUser, (req, res) => {

})


//delete one
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove()
		res.json({message: 'User deleted'});
	} catch (err) {
		res.status(500).json({message: err.message});
	}
	
})

async function getUser(req, res, next){
	let user
	try {
		user = await User.findById(req.params.id)
		if (user == null) {
			return res.status(404).json({message: 'Cannot find user'});
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
	res.user = user;
	next(); 
}

module.exports = router;