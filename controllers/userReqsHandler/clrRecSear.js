//clear recently searched

export async function clrRecSear(req, res) {
    if (res.user.notifications.length) {
        res.user.recently_searched = [];
        try {
            const upUser = await res.user.save();
            res.json(upUser);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message })
        }
    }
}