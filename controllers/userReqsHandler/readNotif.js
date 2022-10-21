//read notification

export async function readNotif(req, res) {
    let updated = false;
    res.user.notifications = res.user.notifications.map(notif => {
        if (notif.id == req.params.notifID) {
            notif.read = true;
            updated = true;
        }
        return notif;
    });
    console.log(res.user.notifications);
    if (updated) {
        try {
            await res.user.save();
        } catch (err) { console.log(err) }
    }
    res.json(updated);
}