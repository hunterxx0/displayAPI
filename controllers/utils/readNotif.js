//read notification

export async function readNotif(req, res) {
    let updated = false;
    const dbcustomer = dbcustomer || res.seller;
    dbcustomer.notifications = dbcustomer.notifications.map(notif => {
        if (notif.id == req.params.notifID) {
            notif.read = 1;
            updated = true;
        }
        return notif;
    });
    if (updated) {
        try {
            await dbcustomer.save();
        } catch (err) { console.log(err) }
    }
    res.json(updated);
}