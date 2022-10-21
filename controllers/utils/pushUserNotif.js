// push Notifications to users
import { User } from '../../models/user.js';
import { v4 } from 'uuid';

export async function pushUserNotif(prod, UpObj, seller_name, Operation) {
    try {
        console.log(prod);
        const users = await User.find({ following: seller_name });
        if (users.length)
            users.map(async function(user) {
                user.notifications.unshift({
                    id: v4(),
                    date: Date.now(),
                    prodID: prod._id,
                    product_name: prod.title,
                    read: false,
                    seller_name,
                    Operation,
                    targets: ( (Operation === 'update') ? (Object.keys(UpObj).map(x => { 
                                            return {name: x, from: prod[x], to: UpObj[x]} 
                                        })) : undefined)
                });
                await user.save()
            });
        return (users);
    } catch (err) {
        console.log('pushNotif err:')
        console.log(err)
    }
}