//clear recently viewed products

export async function clrRecView(req, res) {
	res.user.recently_viewed = [];
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(500).send({message: err.message})
	}
}