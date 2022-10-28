import { Product } from '../../models/product.js';
import { Seller } from '../../models/seller.js';
import { pushUserNotif } from '../utils/pushUserNotif.js';

export async function createProd(req, res) {
    try {
        const seller = res.seller;
        if (seller &&
            seller.product_limit && (
                seller.product_limit === 100 ||
                seller.product_creation_count < seller.product_limit)) {
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
            seller.seller.product_creation_count += 1;
            await seller.save();
            const newProduct = await product.save();
            pushUserNotif(newProduct, undefined, newProduct.seller_name, 'add');
            res.status(201).json(newProduct);
        } else throw 'With your current plan you have exceeded the allowed number of product creation';
    } catch (err) {
        console.log(err)
        if (err === 'with your current plan you have exceeded the allowed number of product creation')
            res.status(412).send({ message: err })
        res.status(400).send({ message: err.message || err })
    }

}