import {Product} from '../../models/product.js';

export async function getByTitle (req, res) {
	try {
		const products = await Product.find( {
			"title" : { $regex: req.params.title, $options: 'i'}
		} ).sort(req.query.sort || 'title')
		.select('-seller_id');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}
