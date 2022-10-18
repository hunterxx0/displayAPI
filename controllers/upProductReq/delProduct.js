//		delete one product

export async function delProduct(req, res) {
	try {
		await res.product.remove()
		res.json({message: 'Product deleted'});
	} catch (err) {
		res.status(500).json({message: err.message});
	}
}