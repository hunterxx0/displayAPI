// get User by id function
import {User} from '../../models/user.js';

export async function getUser(req, res, next) {
	let user
	try {
		if (req.method === 'GET') user = await User.findById(req.params.id).select('-hashedPassword -token');
		else user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({message: 'Cannot find user'});
	} catch (err) {
		console.log(err);
		if (err.name === "CastError") return res.status(404).json({message: 'User ID format error'});
		return res.status(500).json({message: err.message});
	}
	res.user = user;
	next(); 
}