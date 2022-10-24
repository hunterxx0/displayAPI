//clear recently viewed products

export async function clrRecView(req, res) {
    console.log('1');
    if (res.user.notifications.length) {
        res.user.recently_viewed = [];
        console.log('2');
        try {
            console.log('3');
            const upUser = await res.user.save();
            console.log('4');
            res.json(upUser);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message })
        }
    }
}