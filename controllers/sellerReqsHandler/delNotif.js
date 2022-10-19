//delete notification
import { arrRemByID } from '../utils/arrRemByID.js';

export async function delNotif(req, res) {
    const lengthBefUp = res.seller.notifications.length;
    res.seller.notifications = arrRemByID(res.seller.notifications, req.params.notifID);
    if (lengthBefUp > res.seller.notifications.length) {
        try {
            const upSeller = await res.seller.save();
            res.json(upSeller);
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    } else res.status(409).send({ message: 'Connot remove the notification' });
}