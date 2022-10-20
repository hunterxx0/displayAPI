//add favorite
import { Seller } from '../../models/seller.js';
import { pushSellerNotif } from '../utils/pushSellerNotif.js';

export async function addFallow(req, res) {
    try {
        if (!res.user.following.includes(req.params.sellerName)) {
            if (!res.user.unfollowed.includes(req.params.sellerName)) {
                const seller = await Seller.findOne({ name: req.params.sellerName })
                if (!seller) throw 'Seller not found';
                seller.notifications.unshift(pushSellerNotif(
                    undefined,
                    res.user._id.toString(),
                    'follow'
                ))
                await seller.save();
            }
            res.user.following.push(req.params.sellerName);
            const upUser = await res.user.save();
            res.json(upUser);
        } else res.status(409).send({ message: 'Already following' });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}