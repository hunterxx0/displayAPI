const express = require('express');
const User = require('../models/user');

const router = express.Router();

// get all
router.get('/', async (req, res) => {
	try {
		const users = await User.find().sort(req.query.sort || 'created_at');
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
router.patch('/:id/favorites/:favorite', getUser, async (req, res) => {
	res.user.favorites.push(req.params.favorite);
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//delete favorites
router.delete('/:id/favorites/:favorite', getUser, async (req, res) => {
	res.user.favorites = arrRem(res.user.favorites, req.params.favorite)
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})


//delete one user
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove()
		res.json({message: 'User deleted'});
	} catch (err) {
		res.status(500).json({message: err.message});
	}
	
})


//add one request
router.patch('/:id/requests/:requestID', getUser, async (req, res) => {
	res.user.requests.push(req.params.requestID);
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//delete one request
router.delete('/:id/requests/:requestID', getUser, async (req, res) => {
	if (req.params.requestID != null) {
		res.user.requests = arrRem(res.user.requests, req.params.requestID)
		try {
			const upUser = await res.user.save();
			res.json(upUser);
		} catch (err) {
			res.status(400).send({message: err.message})
		}
	}
})

//add one recently searched
router.patch('/:id/searched/:keyword', getUser, async (req, res) => {
	res.user.recently_searched.push(req.params.keyword);
	if (res.user.recently_searched.length > 20) res.user.recently_searched.shift();
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

// utilities:

// get User by id function
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

// remove a value from an array
function arrRem(arr, value) {
	return arr.filter(function(ele){ 
        return ele != value; 
    });
}

module.exports = router;