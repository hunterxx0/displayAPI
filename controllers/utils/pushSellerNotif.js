// Provide Notifications to sellers
import { v4 } from 'uuid';

export async function pushSellerNotif(reqID, user_id, Operation) {
    return ({
            id: v4(),
            date: Date.now(),
            read: 'notRead',
            reqID,
            user_id,
            Operation
        })
}