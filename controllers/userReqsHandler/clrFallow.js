//clear notifications

export async function clrFallow(req, res) {
    if (res.user.following.length) {
        res.user.unfollowed.push(res.user.following);
        res.user.unfollowed = [...new Set(res.user.unfollowed)];
        res.user.following = [];
        try {
            const upUser = await res.user.save();
            res.json(upUser);
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    }
}