//clear logs

export async function clrAdminLogs(req, res) {
    if (res.admin.logs) {
        res.admin.logs = [];
        try {
            const upAdmin = await res.admin.save();
            res.json('Cleared');
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: err.message })
        }
    } else res.json('empty');
}