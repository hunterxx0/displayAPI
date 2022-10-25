import {User} from '../../models/user.js';

export async function getUsers (req, res) {
	try {
		const users = await User.find()
		.select('-__v -hashedPassword -token')
		.sort(req.query.sort || 'created_at');
		res.json(users);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}