//read notification

export async function readNotif(req, res) {
    let updated = false;
    const dbcustomer = res.user || res.seller;
    dbcustomer.notifications = dbcustomer.notifications.map(notif => {
        if (notif.id === req.params.notifID && notif.read === 'notRead') {
            notif.read = 'read';
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