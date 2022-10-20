//clear notifications

export async function clrNotif(req, res) {
    if (res.user.notifications.length) {
        res.user.notifications = [];
        try {
            const upUser = await res.user.save();
            res.json(upUser);
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    }
}