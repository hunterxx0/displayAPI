//add recently searched word
export async function addRecSear(req, res) {
	res.user.recently_searched.unshift(req.params.keyword);
	if (res.user.recently_searched.length != new Set(res.user.recently_searched).size) {
		const indeces = [];
		const findDuplicate = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
		const findindex = arr => arr.filter((item, index) => {
			if (item == findDuplicate(res.user.recently_searched)[0])
				indeces.push(index);
		})
		console.log('dup:');
		findindex(res.user.recently_searched);
		console.log(indeces);
		console.log('bef:');
		console.log(res.user.recently_searched);
		console.log('aft:');
		if (indeces && indeces.length > 1)
			res.user.recently_searched.splice(indeces[1], 1);
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