// upgrade plan

export async function planUpgrade(req, res) {
    const plan = parseInt(req.params.number, 10) || null;
    if (plan) res.seller.product_limit = plan;
    else return res.status(400).send({ message: 'Plan error' });
    try {
        const upSeller = await res.seller.save();
        res.json(upSeller);
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message })
    }
}