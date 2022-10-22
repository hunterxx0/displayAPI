//add favorite
import { Product } from '../../models/product.js';
import { Seller } from '../../models/seller.js';

export async function addFav(req, res) {
    try {
        product = await Product.findById(req.params.favorite)
        if (!product) return res.status(404).send({ message: 'Product not found' });
        const seller = await Seller.findOne({ name: product.seller_name });
        seller.notifications.unshift(pushSellerNotif(
            res.user._id,
            JSON.parse(JSON.stringify(res.product)),
            'favorite'));
        await seller.save();
        res.user.favorites.push(req.params.favorite);
        const upUser = await res.user.save();
        res.json(upUser);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message })
    }
}