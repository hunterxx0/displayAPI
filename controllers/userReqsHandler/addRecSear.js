//add recently searched word
import {findDup} from '../utils/findDup.js';

export async function addRecSear(req, res) {
	res.user.recently_searched.unshift(req.params.keyword);
	if (res.user.recently_searched.length !== new Set(res.user.recently_searched).size) {
		const index = findDup(res.user.recently_searched);
		res.user.recently_searched.splice(index, 1);
	}
	if (res.user.recently_searched.length > 20) res.user.recently_searched.pop();
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(500).send({message: err.message})
	}
}
