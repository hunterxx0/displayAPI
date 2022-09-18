import { v4 } from 'uuid';
import mongoose from "mongoose";
import {Product} from '../models/product.js';
import {User} from '../models/user.js';


export async function  requestAdd(req, res) {
	let request = req.body;
	const myuuid = v4();
	request.id = myuuid;
	const user = await getUser(request.user_id);
	console.log(user);
	console.log('------------');
	try {
		
		if (!user) {
			throw 'Cannot find user';
		}
		
		res.product.requests.push(request);
		user.requests.push(myuuid);
		await user.save();
		const upProduct = await res.product.save();
		res.json(upProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}

}


export async function  requestDel(req, res) {
	const session = await db.startSession();
	await session.startTransaction();
	try {
		const user = User.findOneAndUpdate(
			{requests : req.params.requestID},
			{ $pull: {requests : req.params.requestID}}
			);
		if (!user) throw 'Cannot find user';
		res.product.requests = res.product.requests.filter( obj => obj.id !== req.params.requestID)
		const upProduct = await res.product.save();
		await session.commitTransaction();
		res.json(upProduct);
	} catch (err) {
		await session.abortTransaction();
		res.status(400).send({message: err.message})
	} finally {
		session.endSession();
	}
}


// get User by id function
async function getUser(userId){
	let user
	try {
		user = await User.findById(userId)
		if (!user) {
			return null;
		return (user);
		}
	} catch (err) {
		return null;
	}
}

