//get following list
import { User } from '../../models/user.js';

export async function getFollowers(req, res) {
    try {
        const users = await User.find({ following: res.seller.name })
            .select('_id fullName avatarURL');
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message })
    }
}