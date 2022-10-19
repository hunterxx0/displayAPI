//add favorite

export async function addFav(req, res) {
    if (!res.user.following.includes(req.params.sellerName)) {
        res.user.following.push(req.params.sellerName);
        try {
            const upUser = await res.user.save();
            res.json(upUser);
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    } else res.status(409).send({ message: 'Already following' });
}