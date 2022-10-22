//delete seller

export async function sellerDel(req, res) {
    try {
        const users = await User.updateMany({ following: res.seller.name }, {
            $pullAll: {
                following: res.seller.name,
            }
        });
        await res.seller.remove()
        res.json({ message: 'Seller deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}