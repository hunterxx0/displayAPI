// get all sellers
import { Seller } from '../../models/seller.js';

export async function sellerAll(req, res) {
    try {
        const sellers = await Seller.find()
            .select('-__v -hashedPassword -token')
            .sort(req.query.sort || 'name');
        res.json(sellers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}