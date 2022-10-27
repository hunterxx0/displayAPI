import { User } from '../../models/user.js';

export async function getUsersByPage(req, res) {
    const page = parseInt(req.params.number, 10) || 1;
    if (page <= 0) return res.status(400).json({ message: 'Bad Request' });
    const limit = parseInt(req.query.limit, 10) || 20;
    const sortRev = parseInt(req.query.reverse, 10) || -1;
    const sortVal = req.query.sort || 'created_at';
    const result = {}
    try {
        const users = await User.find()
            .select('-__v -hashedPassword -token')
            .sort({
                [sortVal]: sortRev
            })
            .skip((page - 1) * limit)
            .limit(limit);
        const usersCount = await User.find().count();
        if (!usersCount) return res.json(result);
        result.totalpages = Math.floor(usersCount / limit);
        if (usersCount % limit) result.totalpages += 1;
        if (page > result.totalpages || page < 0) throw 'Bad Request';
        result.nextPage = (page === result.totalpages) ? null : page + 1;
        result.prevPage = (page === 1) ? null : page - 1;
        result.data = users;
        res.json(result);
    } catch (err) {
        console.log('***************')
        console.log(err)
        console.log('***************')
        if (err === 'Bad Request') return res.status(400).json({ message: err });
        res.status(500).json({ message: err.message });
    }
}