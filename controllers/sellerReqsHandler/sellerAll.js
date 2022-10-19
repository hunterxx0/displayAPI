// get all sellers
import { Seller } from '../../models/seller.js';

export async function sellerAll(req, res) {
    try {
        const sellers = await Seller.find()
            .select('-_id -__v')
            .sort(req.query.sort || 'name');
        res.json(sellers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}