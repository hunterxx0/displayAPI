//get all notifications
import { removeUndefined } from '../utils/removeUndefined.js';

export function getUnreadNotif(req, res) {
    const dbcustomer = res.user || res.seller;
    let unreadNotif = dbcustomer.notifications.map(notif => { 
        if (notif.read === 'notRead') return notif 
    });
    unreadNotif = removeUndefined(unreadNotif);
    res.json(unreadNotif);
}