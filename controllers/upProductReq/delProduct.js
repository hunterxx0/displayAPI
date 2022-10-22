//		delete one product
import { User } from '../../models/user.js';

export async function delProduct(req, res) {
    try {
        const users = await User.updateMany({ favorites: res.product._id.toString() }, {
            $pullAll: {
                favorites: res.product._id.toString(),
            }
        });
        await res.product.remove()
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}