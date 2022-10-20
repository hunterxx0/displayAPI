// update one product
import { pushUserNotif } from '../utils/pushUserNotif.js';

export async function updateProduct(req, res) {
    const newUpdate = req.body;
    newUpdate.updated_at = Date.now();
    res.product = Object.assign(res.product, newUpdate);
    try {
        const upProduct = await res.product.save();
        delete newUpdate.updated_at;
        pushUserNotif(res.product, newUpdate, res.product.seller_name, 'update');
        res.json(upProduct);
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}
