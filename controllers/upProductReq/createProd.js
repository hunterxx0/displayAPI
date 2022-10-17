export async function createProd(req, res) {
	const product = new Product({
		title: req.body.title,
		pics_url: req.body.pics_url,
		seller_name: req.body.seller_name,
		category: req.body.category,
		descriptions: req.body.descriptions,
		tags: req.body.tags,
		requests: req.body.requests,
		characteristics: req.body.characteristics,
	})
	try {
		const newProduct = await product.save();
		res.status(201).json(newProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
}