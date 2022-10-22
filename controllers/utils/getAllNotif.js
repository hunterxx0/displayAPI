//get all notifications

export function getAllNotif(req, res) {
    const dbcustomer = res.user || res.seller;
    res.json(dbcustomer.notifications);
}