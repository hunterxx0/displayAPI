export async function updateProduct (req, res) {
	res.product = Object.assign(res.product, req.body);
	try {
		const upProduct = await res.product.save();
		res.json(upProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
}