import { StreamChat } from 'stream-chat';

import { User } from '../../models/user.js';
import { Seller } from '../../models/seller.js';
import { Admin } from '../../models/admin.js';

const serverClient = StreamChat.getInstance(api_key, api_secret, app_id);
const token = serverClient.createToken(newSeller._id.toString(), timestamp());

export async function streamfill(req, res) {
    let sellers = users = null
    try {
        users = await User.find()
        sellers = await Seller.find()
        admins = await Admin.find()
    } catch (err) {
        res.status(500).json({message: err.message});
    }

    users.map((x) => {
        const streamUser = await serverClient.upsertUser({ name: x.username, id: x._id.toString(), image: x.avatarURL });
    })
    sellers.map((x) => {
        const streamUser = await serverClient.upsertUser({ name: x.username, id: x._id.toString(), role: 'seller', image: x.avatarURL });
    })
    admins.map((x) => {
        const streamUser = await serverClient.upsertUser({ name: username, id: newAdmin._id.toString(), role: 'admin' });
    })
    


}