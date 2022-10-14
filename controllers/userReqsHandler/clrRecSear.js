//clear recently searched

export async function clrRecSear (req, res) {
	res.user.recently_searched = [];
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(500).send({message: err.message})
	}
}