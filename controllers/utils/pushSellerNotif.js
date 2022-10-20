// Provide Notifications to sellers
import { v4 } from 'uuid';

export async function pushSellerNotif(reqID, userID, Operation) {
    return ({
            id: v4(),
            date: Date.now(),
            read: false,
            reqID,
            userID,
            Operation
        })
}