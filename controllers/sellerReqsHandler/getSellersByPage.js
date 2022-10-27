// get all sellers by page
import { Seller } from '../../models/seller.js';

export async function getSellersByPage(req, res) {
    const page = parseInt(req.params.number, 10) || 1;
    if (page <= 0) return res.status(400).json({ message: 'Bad Request' });
    const limit = parseInt(req.query.limit, 10) || 20;
    const sortRev = parseInt(req.query.reverse, 10) || -1;
    const sortVal = req.query.sort || 'name';
    const result = {}
    try {
        const sellersCount = await Seller.find().count();
        if (!sellersCount) return res.json(result);
        result.totalpages = Math.floor(sellersCount / limit);
        if (sellersCount % limit) result.totalpages += 1;
        const sellers = await Seller.find()
            .select('-__v -hashedPassword -token')
            .sort({
                [sortVal]: sortRev
            })
            .skip((page - 1) * limit)
            .limit(limit);
        if (page > result.totalpages || page < 0) throw 'Bad Request';
        result.nextPage = (page === result.totalpages) ? null : page + 1;
        result.prevPage = (page === 1) ? null : page - 1;
        result.data = sellers;
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}