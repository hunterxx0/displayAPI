import {User} from '../../models/user.js';
import {findDup} from '../utils/findDup.js';

export async function getOneReq(req, res) {
	if (req.query.visit) {
		try {
			let user = null;
			if (req.query.userId) {
				try {
					user = await User.findById(req.query.userId);
				} catch (err) {}
				if (user) {
					user.recently_viewed.unshift(res.product._id.toString());
					if (res.user.recently_viewed.length !== new Set(res.user.recently_viewed).size) {
						const index = findDup(res.user.recently_viewed);
						res.user.recently_viewed.splice(index, 1);
					}
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
