//add request

export async function addRequest (req, res) {
	res.user.requests.push(req.params.requestID);
	try {
		const upUser = await res.user.save();
		res.json(upUser);
	} catch (err) {
		console.log(err);
		res.status(500).send({message: err.message})
	}
}