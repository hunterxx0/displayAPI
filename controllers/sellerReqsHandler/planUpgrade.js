// upgrade plan

export async function planUpgrade(req, res) {
    let plan = null;
    let edits = null;
    if (req.params.plan === 'basic') {
        plan = 5;
        edits = 1;
    }
    if (req.params.plan === 'standard') {
        plan = 15;
        edits = 10;
    }
    if (req.params.plan === 'premium') {
        plan = 100;
        edits = 100;
    }
    if (plan) {
        res.seller.product_limit = plan;
        res.seller.edit_limit = edits;
    } else return res.status(400).send({ message: 'Plan error' });
    try {
        const upSeller = await res.seller.save();
        res.json(upSeller);
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message })
    }
}