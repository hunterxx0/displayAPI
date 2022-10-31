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
    if (!token) return res.status(401).json({ message: "Unauthorized token" });
    token = token.slice(7);
    verify(token, api_secret, async (err, decoded) => {
        if (err) {
            console.log(`JWT verify Error:\n\n\n${err}\n\n\n`);
            if (err.name === 'TokenExpiredError')
                return res.status(401).json({ message: "Relogin" });
            return res.status(401).json({ message: "Unauthorized" });
        }
        const client = StreamChat.getInstance(api_key, api_secret);
        let user_id = decoded.user_id;
        let { users } = await client.queryUsers({ id: user_id });
        if (!users.length) {
            user_id = encrDecr(decoded.user_id, 'decode');
            users = await client.queryUsers({ id: user_id });
        }
        console.log(users.length);

        if (!users.length || (users[0].role !== 'seller' && users[0].role !== 'admin'))
            return res.status(401).json({ message: "Unauthorized stream" });
        if (users[0].role === 'admin') {
            if (!decoded.role)
                return res.status(401).json({ message: "Unauthorized role admin" });
            const adminRole = encrDecr(decoded.role, 'decode');
            if (Buffer.from(adminRole, 'base64').toString('ascii') != 'admin')
                return res.status(401).json({ message: "Unauthorized admin" });
        } else if (users[0].role === 'seller') {
            let seller = null;
            let seller_name = req.body.seller_name;
            if (!seller_name) seller_name = res.product.seller_name;
            if (!res.seller) {
                seller = await Seller.findOne({ name: seller_name });
                res.seller = seller;
                console.log('seller');
                console.log(seller);
            } else seller = res.seller;
            if (!seller || !seller.token || encrDecr(seller.token, 'decode') !== token)
                return res.status(401).json({ message: "Unauthorized seller" });
        }
        next();
    });
}