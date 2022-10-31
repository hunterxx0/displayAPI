//get Admin logs

export async function getAdminLogs(req, res) {
    if (res.admin && res.admin.logs && res.admin.logs.length) {
            res.json(res.admin.logs);
    } else res.json('empty');
}