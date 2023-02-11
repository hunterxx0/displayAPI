//        delete one product
import { User } from '../../models/user.js';
import { v4 } from 'uuid';
import { pushAdminLog } from './pushAdminLog.js'

export async function delProduct(req, res) {
    try {
        const users = await User.updateMany({ favorites: res.product._id.toString() }, {
            $pull: {
                favorites: res.product._id.toString(),
                recently_viewed: res.product._id.toString(),
            }
        });
        pushAdminLog({
            id: v4(),
            date: Date.now(),
            prodID: res.product._id,
            product_name: res.product.title,
            seller_name: res.product.seller_name,
            Operation: 'delete',
        });
        await res.product.remove()
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}