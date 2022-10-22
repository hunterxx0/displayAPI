// get product by id or name function
import { Seller } from '../../models/seller.js';

export async function getSeller(req, res, next){
	let seller = null;
	try {
		if ( req.params.id ) {
			seller = await Seller.findById(req.params.id)
			.select(' -__v');
		} else if ( req.params.name ) {
			seller = await Seller.findOne({name: req.params.name})
			.select(' -__v');
		}
		if (!seller) {
			return res.status(404).json({message: 'Cannot find seller'});
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
	res.seller = seller;
	next(); 
}