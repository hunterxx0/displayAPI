import {User} from '../models/user.js';

export async function getOneReq(req, res) {
	if (req.query.visit) {
		try {
			const user = await User.findById(req.query.visit);
			if (!user) return res.json(res.product);
			user.recently_viewed.push(res.product._id);
			if (res.product.views) res.product.views += 1;
			else res.product.views = 1;
			await res.product.save();
			await user.save();
		} catch (err) {
			res.json(res.product);
		}
	}
	res.json(res.product);
}