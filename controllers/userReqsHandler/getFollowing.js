//get following list
import { Seller } from '../../models/seller.js';

export async function getFollowing(req, res) {
    try {
        let sellers = null;
        if (res.user.following && res.user.following.length) {
            sellers = await Seller.find({ name: { $in: res.user.following } })
                .select('_id name avatarURL');
        }
        res.json(sellers);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message })
    }
}