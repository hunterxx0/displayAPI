import {User} from '../../models/user.js';

export async function getOneReq(req, res) {
	if (req.query.visit) {
		try {
			let user = null;
			if (req.query.userId) {
				try {
					user = await User.findById(req.query.userId);
				} catch (err) {}
				if (user && !user.recently_viewed.includes(res.product._id.toString())) {
					user.recently_viewed.unshift(res.product._id.toString());
					await user.save();
				}
			}
			if (res.product.views) res.product.views += 1;
			else res.product.views = 1;
			await res.product.save();
		} catch (err) {
			console.log(err);
			res.json(res.product);
		}
	}
	res.json(res.product);
}