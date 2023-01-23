import { StreamChat } from 'stream-chat';

import { User } from '../../models/user.js';
import { Seller } from '../../models/seller.js';
import { Admin } from '../../models/admin.js';

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const serverClient = StreamChat.getInstance(api_key, api_secret, app_id);

export async function streamfill(req, res) {
    let sellers = users = null
    try {
        users = await User.find()
        sellers = await Seller.find()
        admins = await Admin.find()
    } catch (err) {
        res.status(500).json({message: err.message});
    }
    const resss = []

    users.map(async (x) => {
        try {
            await serverClient.upsertUser({ name: x.username, id: x._id.toString(), image: x.avatarURL });
            resss        
        } catch (err) {
            res.status(500).json({message: err.message});
        }
        return x
    })
    sellers.map(async (x) => {
        try {
            await serverClient.upsertUser({ name: x.username, id: x._id.toString(), role: 'seller', image: x.avatarURL });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
        return x
    })
    admins.map(async (x) => {
        try {
            await serverClient.upsertUser({ name: username, id: newAdmin._id.toString(), role: 'admin' });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
        return x
    })
    
    res.json({"result": "done"});

}