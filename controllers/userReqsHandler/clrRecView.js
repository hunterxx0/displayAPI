//clear recently viewed products

export async function clrRecView(req, res) {
    if (res.user.recently_viewed.length) {
        res.user.recently_viewed = [];
        try {
            const upUser = await res.user.save();
            res.json(upUser);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message })
        }
    } else res.json('empty');
}