import { v4 } from 'uuid';

import { Product } from '../../models/product.js';
import { User } from '../../models/user.js';
import { Seller } from '../../models/seller.js';

import { pushSellerNotif } from '../utils/pushSellerNotif.js';


export async function requestAdd(req, res) {
    try {
        let request = req.body;
        request.id = v4();
        const user = await User.findById(request.user_id);
        if (!user) throw 'Cannot find user';
        const seller = await Seller.findOne({ name: res.product.seller_name });
        if (!seller) throw 'Cannot find seller';
        if (!seller.notifications) seller.notifications = [];
        res.product.requests.push(request);
        request.username = user.username;
        seller.notifications.unshift(pushSellerNotif(request, JSON.parse(JSON.stringify(res.product)), 'request'));
        user.requests.push(request.id);
        await user.save();
        await seller.save();
        const upProduct = await res.product.save();
        res.json(upProduct);
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: err.message || err })
    }
}


export async function requestDel(req, res) {
    try {
        const user = User.findOneAndUpdate({ requests: req.params.requestID }, { $pull: { requests: req.params.requestID } });
        if (!user) throw 'Cannot find user';
        res.product.requests = res.product.requests.filter(obj => obj.id !== req.params.requestID)
        const upProduct = await res.product.save();
        res.json(upProduct);
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}