// upgrade plan

export async function planUpgrade(req, res) {
    let plan = null;
    let edits = null
    const plans = {
        free: { limit: 0, edits: 0 },
        basic: { limit: 5, edits: 1 },
        standard: { limit: 15, edits: 10 },
        premium: { limit: 100, edits: 100 },
    }
    if (Object.keys(plans).includes(req.params.plan)) {
        plan = plans[req.params.plan].limit;
        edits = plans[req.params.plan].edits;
    } else return res.status(400).send({ message: 'Plan error' });
    res.seller.plan = req.params.plan;
    res.seller.product_limit = plan;
    res.seller.edit_limit = edits;
    try {
        const upSeller = await res.seller.save();
        res.json(upSeller);
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message })
    }
}