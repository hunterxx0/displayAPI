//get all notifications
import { removeUndefined } from '../utils/removeUndefined.js';

export function getUnreadNotif(req, res) {
    let unreadNotif = res.user.notifications.map(notif => { if (!notif.read) return notif });
    unreadNotif = removeUndefined(unreadNotif);
    res.json(unreadNotif);
}