//delete notification
import { arrRemByID } from '../utils/arrRemByID.js';

export async function delNotif(req, res) {
    const lengthBefUp = res.user.notifications.length;
    res.user.notifications = arrRemByID(res.user.notifications, req.params.notifID)
    if (lengthBefUp > res.user.notifications.length) {
        try {
            const upUser = await res.user.save();
            res.json(upUser);
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    } else res.status(409).send({ message: 'Connot remove the notification' });
}