import {Product} from '../../models/product.js';

export async function getBySellerName (req, res) {
    const page = parseInt(req.query.page, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 20;
    const sortRev = parseInt(req.query.reverse, 10) || -1;
    const sortVal = req.query.sort || 'title';
	try {
		const products = await Product.find({ seller_name: req.params.sellerName })
		.sort({ [sortVal] : sortRev})
		.select('-seller_id')
		.skip(page * limit)
		.limit(limit);
		res.json(products);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}