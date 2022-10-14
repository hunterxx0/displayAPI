//add recently searched word
export async function addRecSear(req, res) {
	res.user.recently_searched.push(req.params.keyword);
	if (res.user.recently_searched.length != new Set(res.user.recently_searched).size) {
		const index = res.user.recently_searched.indexOf(req.params.keyword);
		if (index > -1) res.user.recently_searched.splice(index, 1);
	}
	if (res.user.recently_searched.length > 20) res.user.recently_searched.shift();
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(500).send({message: err.message})
	}
}