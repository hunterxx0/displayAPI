// push Notifications to users
import { v4 } from 'uuid';

import { User } from '../../models/user.js';

import { removeUndefined } from './removeUndefined.js'
import { pushAdminLog } from './pushAdminLog.js'



export async function pushUserNotif(prod, UpObj, seller_name, Operation) {
    try {
        const users = await User.find({ $or: [{ following: seller_name }, { favorites: prod._id }] });
        let notif = {
            id: v4(),
            date: Date.now(),
            prodID: prod._id,
            product_name: prod.title,
            read: 'notRead',
            seller_name,
            Operation,
            targets: ((Operation === 'update') ? (Object.keys(UpObj)
                .filter(
                    val => ((JSON.stringify(UpObj[val]) !== JSON.stringify(prod[val])) && val !== 'seller_id'))
                .map(
                    x => {
                        return { name: x, from: prod[x], to: UpObj[x] }
                    }
                )
            ) : undefined)
        }
        notif = removeUndefined(notif);
        if (users.length) users.map(async function(user) {
            user.notifications.unshift(notif);
            await user.save()
        });
        pushAdminLog(notif);
        return (users);
    } catch (err) {
        console.log('pushNotif err:')
        console.log(err)
    }
}