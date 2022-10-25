import {Product} from '../../models/product.js';

export async function getProduct(req, res, next){
	let product
	try {
		product = await Product.findById(req.params.id)
		.select('-seller_id');
		if (product == null) {
			return res.status(404).json({message: 'Cannot find product'});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({message: err.message, type: err.valueType, keys: Object.keys(err)});
	}
	res.product = product;
	next(); 
}
