import {Product} from '../../models/product.js';

export async function getCatgSellers (req, res) {
	try {
		const products = await Product.find({"category": req.params.category})
		.select('seller_name -_id');
		/*
		const result = [...new Set(products.map(a => a.seller_name))];
		*/
		res.json(result);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}