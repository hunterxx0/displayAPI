import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StreamChat } from 'stream-chat';

import { Admin } from '../../models/admin.js';

import { encrDecr } from '../auth/encrDecr.js';
import { removeUndefined } from '../utils/removeUndefined.js'

export async function createAdmin(req, res) {
    const {
        username,
        password,
    } = req.body;
    const hashedPassword = encrDecr(await bcrypt.hash(password, 10));
    const admin = new Admin({
        username,
        hashedPassword,
    })
    try {
        const newAdmin = await admin.save();
        const serverClient = StreamChat.getInstance(api_key, api_secret, app_id);
        const streamUser = await serverClient.upsertUser({ name: username, id: newAdmin._id.toString(), role: 'admin' });
        res.status(201).json(newAdmin);
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: err.message || err })
    }
}