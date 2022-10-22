//delete notification
import { arrRemByID } from '../utils/arrRemByID.js';

export async function delNotif(req, res) {
    const lengthBefUp = res.user.notifications.length;
    const dbcustomer = res.user || res.seller;
    dbcustomer.notifications = arrRemByID(res.user.notifications, req.params.notifID);
    if (lengthBefUp > res.user.notifications.length) {
        try {
            const upCostumer = await dbcustomer.save();
            res.json(upCostumer);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message })
        }
    } else res.status(409).send({ message: 'Connot remove the notification' });
}