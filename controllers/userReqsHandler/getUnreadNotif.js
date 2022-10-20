//get all notifications

export function getAllNotif(req, res) {
    res.json(res.user.notifications.map(notif => { if (notif.read) return notif }));
}