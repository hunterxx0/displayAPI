//delete favorites

export async function delFav(req, res) {
	if (res.user.favorites.includes(req.params.favorite)) {
		res.user.favorites = arrRem(res.user.favorites, req.params.favorite)
		try {
			const upUser = await res.user.save();
			res.json(upUser);
		} catch (err) {
			res.status(500).send({message: err.message})
		}
	} else res.status(409).send({message: 'Connot remove the keyword'});
}