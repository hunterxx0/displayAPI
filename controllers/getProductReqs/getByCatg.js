import {Product} from '../../models/product.js';

export async function getByCatg (req, res) {
	try {
		const products = await Product.find({ category: req.params.category })
		.select('-seller_id')
		.sort(req.query.sort || 'title');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}