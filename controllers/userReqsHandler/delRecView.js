//delete recently viewed product
import {arrRem} from '../utils/arrRem.js';

export async function delRecView(req, res) {
	if (res.user.recently_viewed.includes(req.params.productID)) {
		res.user.recently_viewed = arrRem(res.user.recently_viewed, req.params.productID)
		try {
			const upUser = await res.user.save();
			res.json(upUser);
		} catch (err) {
			console.log(err);
			res.status(500).send({message: err.message})
		}
	} else res.status(409).send({message: 'Connot remove'});
}