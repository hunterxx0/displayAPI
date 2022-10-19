// create seller
import { Seller } from '../../models/seller.js';

export async function sellerCreate(req, res) {
    const seller = new Seller({
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        seller_country: req.body.seller_country,
        website: req.body.website,
    })
    try {
        const newSeller = await seller.save();
        res.status(201).json(newSeller);
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}