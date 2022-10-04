import {Product} from '../../models/product.js';

export async function getAllReq(req, res) {
    const limit = parseInt(req.query.limit, 10) || 20;
    const sortRev = parseInt(req.query.reverse, 10) || -1;
    const sortVal = req.query.sort || 'title';
	try {
		const products = await Product.find()
		.select('-seller_id')
		.sort({ [sortVal] : sortRev})
		.limit(limit);
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}