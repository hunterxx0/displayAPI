// update one product
import {pushNotif} from '../utils/pushNotif.js';

export async function updateProduct(req, res) {
    const newUpdate = req.body;
    newUpdate.updated_at = Date.now;
    res.product = Object.assign(res.product, newUpdate);
    try {
        const upProduct = await res.product.save();
        pushNotif(res.product._id.toString(), 'update');
        res.json(upProduct);
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}