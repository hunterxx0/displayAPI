// update one product
import { pushUserNotif } from '../utils/pushUserNotif.js';

export async function updateProduct(req, res) {
    const newUpdate = req.body;
    const oldProd = JSON.parse(JSON.stringify(res.product));
    newUpdate.updated_at = Date.now();
    res.product = Object.assign(res.product, newUpdate);
    try {
        const upProduct = await res.product.save();
        delete newUpdate.updated_at;
        pushUserNotif(oldProd, newUpdate, res.product.seller_name, 'update');
        res.json(upProduct);
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}
