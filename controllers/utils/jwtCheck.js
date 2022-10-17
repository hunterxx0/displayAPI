import {Seller} from '../../models/seller.js';
import jwt from 'jsonwebtoken';
import {StreamChat} from 'stream-chat';

const { verify } = jwt;
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

export async function JWTAuth(req, res, next) {
	let token = req.headers['authorization'];
	if (!token) return res.status(401).json({message: "Unauthorized"});
	token = token.slice(7);
	verify(token, api_secret, async (err, decoded) => {
		if (err) {
	      console.log(err);
	      return res.status(401).json({message: "Unauthorized"});
	    }
	    const client = StreamChat.getInstance(api_key, api_secret);
     	const { users } = await client.queryUsers({ id: decoded.user_id });
	    if (!users.length || (users[0].role !== 'seller' && users[0].role !== 'admin'))
	    	return res.status(401).json({message: "Unauthorized"});
		if (res.product && users[0].role == 'seller') {
    		let seller = await Seller.findOne({name: res.product.seller_name});
	    	if (!seller || !seller.token || seller.token !== token)
	    		return res.status(401).json({message: "Unauthorized"});
	  	}
	  	next();
	});
}
