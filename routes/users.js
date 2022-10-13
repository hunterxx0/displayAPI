import express from "express";

import {User} from '../models/user.js';

import {arrRem} from '../controllers/utils/arrRem.js';
import {getUser} from '../controllers/utils/getUser.js';

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
/*
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
*/
//update one
router.patch('/:id', getUser, async (req, res) => {
	res.user = Object.assign(res.user, req.body);
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//add recently searched word
router.patch('/:id/search/:keyword', getUser, async (req, res) => {
	res.user.recently_searched.push(req.params.keyword);
	if (res.user.recently_searched.length != new Set(res.user.recently_searched).size) {
		const index = res.user.recently_searched.indexOf(req.params.keyword);
		if (index > -1) res.user.recently_searched.splice(index, 1);
	}
	if (res.user.recently_searched.length > 20) res.user.recently_searched.shift();
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//delete recently searched word
router.delete('/:id/search/delete/:keyword', getUser, async (req, res) => {
	if (res.user.recently_searched.includes(req.params.keyword)) {
		console.log('bef')
		console.log(res.user.recently_searched.length)
		arrRem(res.user.recently_searched, req.params.keyword);
		console.log('af')
		console.log(res.user.recently_searched.length)
		try {
			const upUser = await res.user.save();
			res.json(upUser);
		} catch (err) {
			res.status(400).send({message: err.message})
		}
	} else {res.status(409).send({message: 'Connot remove the keyword'})}
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




export {router as usersRouter};