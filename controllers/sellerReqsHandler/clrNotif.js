//clear notifications

export async function clrNotif(req, res) {
    res.seller.notifications = [];
    try {
        const upSeller = await res.seller.save();
        res.json(upSeller);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}