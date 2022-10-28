import { Seller } from '../../models/seller.js';
import jwt from 'jsonwebtoken';
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
            return res.status(401).json({ message: "Unauthorized" });
        }
        const client = StreamChat.getInstance(api_key, api_secret);
        const { users } = await client.queryUsers({ id: decoded.user_id });
        if (!users.length || (users[0].role !== 'seller' && users[0].role !== 'admin'))
            return res.status(401).json({ message: "Unauthorized stream" });
        if (users[0].role === 'seller') {
            let seller = null;
            console.log('body');
                console.log(req.body);
            if (!res.seller) {
            	seller = await Seller.findOne({ name: (res.product.seller_name || req.body.seller_name) });
            	res.seller = seller;
                console.log('seller');
                console.log(seller);
            } else seller = res.seller;
            console.log('*******************');
            console.log(seller);
            console.log('******************');
            if (!seller || !seller.token || encrDecr(seller.token, 'decode') !== token)
                return res.status(401).json({ message: "Unauthorized seller" });
        }
        if (users[0].role === 'admin') {
        	console.log('admin');
        }
        next();
    });
}