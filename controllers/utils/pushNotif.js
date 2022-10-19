// push Notifications to users
import { User } from '../../models/user.js';
import { v4 } from 'uuid';

export async function pushNotif(prodID, Operation) {
    try {
        const users = await User.find({ favorites: prodID });
        if (users.length)
            users.map(user => {
                user.notifications.unshift({
                    id: v4(),
                    prodID,
                    date: Date.now,
                    Operation
                });
                await user.save()
            });
    } catch (err) {
        console.log('pushNotif err:')
        console.log(err)
    }
}