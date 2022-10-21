//get all notifications

export function getUnreadNotif(req, res) {
    res.json(res.user.notifications.map(notif => { if (!notif.read) return notif }));
}
