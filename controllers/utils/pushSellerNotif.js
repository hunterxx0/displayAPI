// Provide Notifications to sellers
import { v4 } from 'uuid';
import { removeUndefined } from './removeUndefined.js'

export async function pushSellerNotif(req, prod, Operation) {
    let notif = {
        id: v4(),
        date: Date.now(),
        read: 'notRead',
        request_id: ((Operation === 'request') ? request.id.toString() : undefined),
        user_id: ((Operation === 'request') ? req.user_id : req),
        product_name: ((Operation === 'request' || Operation === 'favorite') ? prod.title : undefined),
        product_id: ((Operation === 'request' || Operation === 'favorite') ? prod._id.toString() : undefined),
        Operation
    }
    notif = removeUndefined(notif);
    return (notif);
}