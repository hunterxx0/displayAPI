import {Product} from '../../models/product.js';

export async function getByTitleCatg (req, res)  {
	try {
		const query = (req.params.category == 'all' ) ? {
			"title" : { $regex: req.params.title, $options: 'i'}} :  {
				"title" : { $regex: req.params.title, $options: 'i'},
				"category": req.params.category
			};
		const page = parseInt(req.query.page, 10) || 0;
		const products = await Product.find( query )
		.select('-seller_id')
		.skip(page * 10)
		.limit(10)
		.sort(req.query.sort || 'title');
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}