import jwt from 'jsonwebtoken';
import { Buffer } from 'node:buffer';

import { Seller } from '../../models/seller.js';
import { Admin } from '../../models/admin.js';

import { StreamChat } from 'stream-chat';
import { encrDecr } from '../auth/encrDecr.js';

const { verify } = jwt;
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

export async function JWTAuth(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    token = token.slice(7);
    verify(token, api_secret, async (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError')
                return res.status(401).json({ message: "Relogin" });
            return res.status(401).json({ message: "Unauthorized" });
        }
        const client = StreamChat.getInstance(api_key, api_secret);
        let { users } = await client.queryUsers({ id: decoded.user_id });
        if (!users.length || (users[0].role !== 'seller' && users[0].role !== 'admin'))
            return res.status(401).json({ message: "Unauthorized" });
        if (users[0].role === 'seller') {
            let seller = null;
            let seller_name = null;
            if (req.body.seller_name) seller_name = req.body.seller_name;
            else if (!seller_name && res.seller) seller_name = res.seller.name;
            else if (!seller_name && res.product.seller_name) seller_name = res.product.seller_name;
            else seller_name = users[0].name;
            if (!res.seller) {
                seller = await Seller.findOne({ name: seller_name });
                res.seller = seller;
            } else seller = res.seller;
            if (!seller || !seller.token || encrDecr(seller.token, 'decode') !== token)
                return res.status(401).json({ message: "Unauthorized" });
        }
        if (users[0].role === 'admin') {
            if (decoded.user_id === req.params.id) res.admin = await Admin.findById(req.params.id);
            if (!res.admin) return res.status(401).json({ message: "Unauthorized admin" });
        }
        next();
    });
}