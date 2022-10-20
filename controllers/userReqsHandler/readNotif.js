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
    if (updated) await res.user.save();
    res.json(updated);
}