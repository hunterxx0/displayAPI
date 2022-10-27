// update one product
import { pushUserNotif } from '../utils/pushUserNotif.js';

export async function updateProduct(req, res) {
    if (res.seller && (res.seller.edit_limit === 100 ||
            res.seller.edited_products.length < res.seller.edit_limit)) {
        const newUpdate = req.body;
        const oldProd = JSON.parse(JSON.stringify(res.product));
        res.product = Object.assign(res.product, newUpdate);
        try {
            res.seller.edited_products.push(res.product._id.toString());
            await res.seller.save()
            const upProduct = await res.product.save();
            pushUserNotif(oldProd, newUpdate, res.product.seller_name, 'update');
            res.json(upProduct);
        } catch (err) {
            res.status(400).send({ message: err.message })
        }
    }
}