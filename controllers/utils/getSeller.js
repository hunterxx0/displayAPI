// get product by id or name function
import { Seller } from '../../models/seller.js';

export async function getSeller(req, res, next) {
    let seller = null;
    try {
        if (req.method === 'GET') seller = await sellerGet(req.params);
        else seller = await sellerPatch(req.params);
        if (!seller) {
            return res.status(404).json({ message: 'Cannot find seller' });
        }
    } catch (err) {
    	if (err.name === "CastError") return res.status(404).json({message: 'Seller ID format error'});
        return res.status(500).json({ message: err.message });
    }
    res.seller = seller;
    next();
}

async function sellerGet(params) {
    let seller = null;
    if (params.id) {
        seller = await Seller.findById(params.id)
            .select('-__v -hashedPassword -token');
    } else if (params.name) {
        seller = await Seller.findOne({ name: params.name })
            .select('-__v -hashedPassword -token');
    }
    return seller;
}

async function sellerPatch(params) {
    let seller = null;
    if (params.id) {
        seller = await Seller.findById(params.id)
            .select('-__v');
    } else if (params.name) {
        seller = await Seller.findOne({ name: req.params.name })
            .select('-__v');
    }
    return seller;
}