//update user

export async function userUpdate(req, res) {
	res.user = Object.assign(res.user, req.body);
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
}