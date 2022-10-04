import {Product} from '../../models/product.js';

export async function getSellerReq (req, res) {
	let requests = req.body.requests
	try {
		if (!requests) throw 'No requests';
		const products = await Product.find({"requests.id": { $in: requests}})
		.select('-seller_id')
		let result = products.map(a => a.requests.filter(request => requests.includes(request.id) ));
		result = [...new Set(result)].flat();
		res.json(result);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}