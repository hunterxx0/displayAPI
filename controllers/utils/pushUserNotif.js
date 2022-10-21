// push Notifications to users
import { User } from '../../models/user.js';
import { v4 } from 'uuid';

export async function pushUserNotif(prod, UpObj, seller_name, Operation) {
    try {
        { $or: [{ following: seller_name }, { favorites: prod._id }] }
        const users = await User.find();
        if (users.length)
            users.map(async function(user) {
                let notif = {
                    id: v4(),
                    date: Date.now(),
                    prodID: prod._id,
                    product_name: prod.title,
                    read: false,
                    seller_name,
                    Operation,
                    targets: ((Operation === 'update') ? (Object.keys(UpObj).map(x => {
                        if (UpObj[x] !== prod[x]) return { name: x, from: prod[x], to: UpObj[x] }
                    })) : undefined)
                }
                notif = removeUndefined(notif);
                user.notifications.unshift(notif);
                await user.save()
            });
        return (users);
    } catch (err) {
        console.log('pushNotif err:')
        console.log(err)
    }
}

function removeUndefined(obj) {
    Object.keys(obj).forEach(key => {
        if (!obj[key]) delete obj[key];
        else if (typeof obj[key] === Object) removeUndefined(obj[key])
    });
    return obj;
}