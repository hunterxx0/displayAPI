// admin logs
import { Admin } from '../../models/admin.js';
import { removeUndefined } from './removeUndefined.js'
import { v4 } from 'uuid';

export async function pushAdminLog(notif) {
    try {
        const admins = await Admin.find();
        if (admins.length && notif) admins.map(async function(admin) {
            admin.logs.unshift(notif);
            await admin.save()
        });
        else return null;
        return (admins);
    } catch (err) {
        console.log('admin pushlog err:')
        console.log(err)
    }
}