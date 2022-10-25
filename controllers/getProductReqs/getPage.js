import {Product} from '../../models/product.js';


export async function getPage (req, res) {
    const page = parseInt(req.params.number, 10) || 1;
	if (page <= 0) return res.status(400).json({message: 'Bad Request'});
    const limit = parseInt(req.query.limit, 10) || 20;
    const sortRev = parseInt(req.query.reverse, 10) || -1;
    const sortVal = req.query.sort || 'title';
    const result = {}
	try {
		const products = await Product.find()
		.select('-seller_id')
		.sort({ [sortVal] : sortRev})
		.skip((page - 1) * limit)
		.limit(limit);
		const productsCount = await Product.find().count();
		result.totalpages = Math.floor(productsCount/limit);
		if (productsCount%limit) result.totalpages += 1;
		if (page > result.totalpages || page < 0) throw 'Bad Request';
		result.nextPage = (page == result.totalpages) ? null : page + 1;
		result.prevPage = (page == 1) ? null : page - 1;
		result.data = products;
		res.json(result);
	} catch (err) {
		console.log(err);
		if (err == 'Bad Request') return res.status(400).json({message: err.message});
		res.status(500).json({message: err.message});
	}
}