// Update seller

export async function sellerUpdate(req, res) {
	res.seller = Object.assign(res.seller, req.body);
	try {
		const upSeller = await res.seller.save();
		res.json(upSeller);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
}