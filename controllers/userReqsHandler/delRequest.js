//delete request
import {arrRem} from '../utils/arrRem.js';

export async function delRequest(req, res) {
	if (res.user.requests.includes(req.params.requestID)) {
		res.user.requests = arrRem(res.user.requests, req.params.requestID)
		try {
			const upUser = await res.user.save();
			res.json(upUser);
		} catch (err) {
			res.status(500).send({message: err.message})
		}
	} else res.status(409).send({message: 'Connot remove the request'});
}