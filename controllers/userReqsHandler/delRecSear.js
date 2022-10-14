//delete recently searched word
import {arrRem} from '../utils/arrRem.js';

export async function delRecSear(req, res) {
	if (res.user.recently_searched.includes(req.params.keyword)) {
		res.user.recently_searched = arrRem(res.user.recently_searched, req.params.keyword);
		try {
			const upUser = await res.user.save();
			res.json(upUser);
		} catch (err) {
			res.status(500).send({message: err.message})
		}
	} else {res.status(409).send({message: 'Connot remove the keyword'})}
}