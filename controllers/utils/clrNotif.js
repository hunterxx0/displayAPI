//clear notifications

export async function clrNotif(req, res) {
    const dbcustomer = res.user || res.seller;
    if (dbcustomer.notifications.length) {
        dbcustomer.notifications = [];
        try {
            const upUser = await dbcustomer.save();
            res.json(upUser);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message })
        }
    } else res.json('empty');
}