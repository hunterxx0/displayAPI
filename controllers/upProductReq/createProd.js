import { Product } from '../../models/product.js';
import { Seller } from '../../models/seller.js';
import { pushUserNotif } from '../utils/pushUserNotif.js';

export async function createProd(req, res) {
    try {
        const seller = Seller.findOne({ name: req.body.seller_name });
        if (seller &&
            seller.product_limit && (
                seller.product_limit === 100 ||
                Product.find({ seller_name: req.body.seller_name }).count() < seller.product_limit)) {
            const product = new Product({
                title: req.body.title,
                pics_url: req.body.pics_url,
                seller_name: req.body.seller_name,
                seller_id: seller._id.toString(),
                category: req.body.category,
                descriptions: req.body.descriptions,
                tags: req.body.tags,
                requests: req.body.requests,
                characteristics: req.body.characteristics,
            })
            const newProduct = await product.save();
            pushUserNotif(newProduct, undefined, newProduct.seller_name, 'add');
            res.status(201).json(newProduct);
        } else throw 'Product count limit reached';
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: err.message || err })
    }

}