//add recently searched word
export async function addRecSear(req, res) {
	res.user.recently_searched.unshift(req.params.keyword);
	if (res.user.recently_searched.length != new Set(res.user.recently_searched).size) {
		const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
		console.log('dup:');
		const index = findDuplicates(res.user.recently_searched);
		console.log(index);
		console.log('bef:');
		console.log(res.user.recently_searched);
		console.log('aft:');
		if (index && index.length > 1)
			res.user.recently_searched.splice(index[1], 1);
		console.log(res.user.recently_searched);
	}
	if (res.user.recently_searched.length > 20) res.user.recently_searched.pop();
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(500).send({message: err.message})
	}
}