import {User} from '../../models/user.js';

export async function getOneReq(req, res) {
	if (req.query.visit) {
		try {
			let user = null;
			try {
				user = await User.findById(req.query.visit);
			} catch (err) {}
			if (user && !user.recently_viewed.includes(res.product._id.toString())) {
				user.recently_viewed.push(res.product._id);
				await user.save();
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