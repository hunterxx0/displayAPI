import { connect } from 'getstream';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { StreamChat } from 'stream-chat';
import { Buffer } from 'node:buffer';

import { User } from '../../models/user.js';
import { Seller } from '../../models/seller.js';
import { Admin } from '../../models/admin.js';
import { encrDecr } from './encrDecr.js';
import { removeUndefined } from '../utils/removeUndefined.js'
import jwt from 'jsonwebtoken';

const { verify, sign } = jwt;
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

// token expires in 3 hours
const timestamp = () => Math.floor(Date.now() / 1000) + (60 * 60 * 3);


class AuthController {
    static async sellerSignup(req, res) {
        try {
            const {
                username: name,
                password,
                phoneNumber: phone_number,
                avatarURL,
                email,
                website,
                seller_country
            } = req.body;
            const hashedPassword = encrDecr(await bcrypt.hash(password, 10));
            const seller = {
                name,
                hashedPassword,
                phone_number,
                avatarURL,
                email,
                website,
                seller_country
            }
            const newSeller = new Seller(seller);
            const serverClient = StreamChat.getInstance(api_key, api_secret, app_id);
            const token = serverClient.createToken(newSeller._id.toString(), timestamp());
            newSeller.token = encrDecr(token);
            const savedSeller = await newSeller.save();
            const streamUser = await serverClient.upsertUser({ name, id: savedSeller._id.toString(), role: 'seller', image: avatarURL });
            return res.status(201).json({ username: name, userId: savedSeller._id.toString(), token });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error });
        }
    }
    static async signup(req, res) {
        try {
            const {
                username,
                password,
                fullName,
                phoneNumber: phone_number,
                avatarURL,
                email
            } = req.body;
            const hashedPassword = encrDecr(await bcrypt.hash(password, 10));
            const user = {
                username,
                hashedPassword,
                fullName,
                phone_number,
                avatarURL,
                email
            }
            const newUser = new User(user);
            const serverClient = StreamChat.getInstance(api_key, api_secret, app_id);
            const token = serverClient.createToken(newUser._id.toString(), timestamp());
            newUser.token = encrDecr(token);
            const dbuser = await User.findOne({ username });
            const savedUser = await newUser.save();
            const streamUser = await serverClient.upsertUser({ name: username, id: savedUser._id.toString(), image: avatarURL });
            return res.status(201).json({ username, userId: savedUser._id.toString(), token });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error });
        }
    }
    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const client = StreamChat.getInstance(api_key, api_secret);
            const { users } = await client.queryUsers({ name: username });
            const userdb = await User.findOne({ username });
            if (!users.length)
                return res.status(401).json({ message: 'User not found' });
            let dbcustomer = userdb || (await Seller.findOne({ name: username }));
            if (!dbcustomer && users[0].role !== 'admin')
                return res.status(401).json({ message: 'User not found' });
            if (users[0].role === 'admin') {
                dbcustomer = await Admin.findOne({ username });
                if (!dbcustomer)
                    return res.status(401).json({ message: 'User not found' });
            }
            let success = await bcrypt.compare(password, encrDecr(dbcustomer.hashedPassword, 'decode'));
            if (users[0].banned) return res.status(403).json({ message: 'User is banned', ban_expires });
            if (success) {
                const serverClient = connect(api_key, api_secret, app_id);
                const token = serverClient.createUserToken(users[0].id, timestamp());
                dbcustomer.token = encrDecr(token);
                await dbcustomer.save();
                res.status(200).json({
                    token,
                    username,
                    userId: users[0].id,
                    avatarURL: dbcustomer.avatarURL
                });
            } else res.status(401).json({ message: 'Unauthorized' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    }
    static async editLogin(req, res) {
        try {
            const info = req.body;
            const constmID = info.id;
            delete info.id;
            delete newUpdate.product_creation_count;
            delete newUpdate.product_limit;
            delete newUpdate.edit_limit;
            delete newUpdate.edited_products;
            delete newUpdate.response_time;
            delete newUpdate.token;
            delete newUpdate.notifications;
            Object.keys(info).forEach(key => info[key] === undefined && delete info[key]);
            if ('password' in info) {
                info.hashedPassword = encrDecr(await bcrypt.hash(info['password'], 10));
                delete info['password'];
            }
            if (info.username || info.avatarURL) {
                const client = StreamChat.getInstance(api_key, api_secret);
                const { users } = await client.queryUsers({ id: constmID });
                if (!users.length)
                    return res.status(401).json({ message: 'User not found' });
                const obj = {
                    id: constmID,
                    name: info.username,
                    role: users[0].role,
                    image: info.avatarURL
                };
                const sUsers = await client.upsertUser(removeUndefined(obj));
                if (!sUsers)
                    return res.status(401).json({ message: 'User not found' });
            }
            let dbcustomer = null;
            dbcustomer = await updateUser(constmID, info);
            if (!dbcustomer) {
                delete Object.assign(info, {
                    ['name']: info['username']
                })['username'];
                dbcustomer = await updateSeller(constmID, info);
            }
            if (!dbcustomer) {
                if (client) await client.upsertUser(users[0]);
                return res.status(401).json({ message: 'User not found' });
            }
            res.status(200).json(dbcustomer);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    }
    static async deleteUser(req, res) {
        try {
            let delDbObj = null
            const constmID = req.params.id;
            const client = StreamChat.getInstance(api_key, api_secret);
            const { users } = await client.queryUsers({ id: constmID });
            if (!users.length)
                return res.status(401).json({ message: 'User not found' });
            let dbcustomer = await findUserSeller(constmID);
            if (!dbcustomer)
                return res.status(401).json({ message: 'User not found' });
            if (dbcustomer == 'user') delDbObj = await User.deleteOne({ _id: constmID });
            else delDbObj = await Seller.deleteOne({ _id: constmID });
            await client.deleteUser(constmID, { hard_delete: true });
            res.status(200).json('User deleted');
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    }
}


async function updateSeller(sellerId, info) {
    let seller = null;
    try {
        seller = await Seller.findOneAndUpdate({ _id: sellerId }, info, { new: true });
    } catch (err) {
        console.log('updateSeller');
        console.log(err);
    }
    return seller;
}
async function updateUser(userId, info) {
    let user = null;
    try {
        user = await User.findOneAndUpdate({ _id: userId }, info, { new: true });
    } catch (err) {
        console.log('updateUser');
        console.log(err);
    }
    return user;
}

async function findUserSeller(userId) {
    let user = null;
    try {
        user = await User.findById(userId);
        if (user) return 'user';
    } catch (err) {
        console.log('findUser error');
        console.log(err);
    }
    try {
        user = await Seller.findById(userId);
        if (user) return 'seller';
    } catch (err) {
        console.log('findSeller error');
        console.log(err);
    }
    return user
}

export { AuthController };