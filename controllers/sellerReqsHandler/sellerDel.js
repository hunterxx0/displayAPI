//delete seller

export async function sellerDel(req, res) {
    try {
        await res.seller.remove()
        res.json({ message: 'Seller deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}