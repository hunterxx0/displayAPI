import {Seller} from '../../models/seller.js';
import jwt from 'jsonwebtoken';

const { verify } = jwt;
const api_secret = process.env.STREAM_API_SECRET;

export async function JWTAuth(req, res, next) {
	let token = req.headers['authorization'];
	if (!token) return res.status(401).json({message: "Unauthorized"});
	token = token.slice(7);
	verify(token, api_secret, async (err, decoded) => {
		if (err) {
      console.log(err);
      return res.status(401).json({message: "Unauthorized"});
    }
    if (decoded.role !== 'seller' && decoded.role !== 'admin')
    	return res.status(401).json({message: "Unauthorized"});
		if (res.product && decoded.role == 'seller') {
    	let seller = await Seller.findOne({name: res.product.seller_name});
    	if (!seller || !seller.token || seller.token !== token)
    		return res.status(401).json({message: "Unauthorized"});
  	}
  	next();
  });
}
