import {Product} from '../../models/product.js';

export async function getBySellerCatg (req, res) {
	try {
		const products = await Product.find({
			"seller_name" : req.params.seller,
			"category": req.params.category
		})
		.sort(req.query.sort || 'title')
		.select('-seller_id');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}