//delete following
import { arrRem } from '../utils/arrRem.js';

export async function delFallow(req, res) {
    if (res.user.following.includes(req.params.sellerName)) {
        if (!res.user.unfollowed.includes(req.params.sellerName))
            res.user.unfollowed.push(req.params.sellerName);
        res.user.following = arrRem(res.user.following, req.params.sellerName)
        try {
            const upUser = await res.user.save();
            res.json(upUser);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message })
        }
    } else res.status(409).send({ message: 'Connot remove the follow' });
}