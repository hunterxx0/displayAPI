import { v4 } from 'uuid';
import mongoose from "mongoose";
import { Product } from '../../models/product.js';
import { User } from '../../models/user.js';
import { Seller } from '../../models/seller.js';

import { pushSellerNotif } from '../utils/pushSellerNotif.js';


export async function requestAdd(req, res) {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        let request = req.body;
        request.id = v4();
        const user = await User.findById(request.user_id);
        if (!user) {
            throw 'Cannot find user';
        }
        const seller = await Seller.find({ name: res.product.seller_name });
        if (!seller) {
            throw 'Cannot find seller';
        }
        console.log(seller);
        console.log('******************');
        console.log(notifications);

        seller.notifications.unshift(pushSellerNotif(request, JSON.parse(JSON.stringify(res.product)), 'request'));
        res.product.requests.push(request);
        user.requests.push(myuuid);
        await user.save();
        await seller.save();
        const upProduct = await res.product.save();
        await session.commitTransaction();
        res.json(upProduct);
    } catch (err) {
        await session.abortTransaction();
        console.log(err)
        res.status(400).send({ message: err.message || err })
    } finally {
        session.endSession();
    }

}


export async function requestDel(req, res) {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const user = User.findOneAndUpdate({ requests: req.params.requestID }, { $pull: { requests: req.params.requestID } });
        if (!user) throw 'Cannot find user';
        res.product.requests = res.product.requests.filter(obj => obj.id !== req.params.requestID)
        const upProduct = await res.product.save();
        await session.commitTransaction();
        res.json(upProduct);
    } catch (err) {
        await session.abortTransaction();
        res.status(400).send({ message: err.message })
    } finally {
        session.endSession();
    }
}