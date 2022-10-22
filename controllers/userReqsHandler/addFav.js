//add favorite

export async function addFav(req, res) {
	res.user.favorites.push(req.params.favorite);
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		console.log(err);
		res.status(500).send({message: err.message})
	}
}