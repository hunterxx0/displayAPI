import { connect } from 'getstream';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import {StreamChat} from 'stream-chat';

import {User} from '../../models/user.js';
import {Seller} from '../../models/seller.js';
import jwt from 'jsonwebtoken';

const { verify } = jwt;
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

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
      const hashedPassword = await bcrypt.hash(password, 10);
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
      // token expires in 3 hours
      const timestamp = Math.floor(Date.now() / 1000) + (60 * 60 * 3);
      const serverClient = StreamChat.getInstance(api_key, api_secret, app_id);
      const token = serverClient.createToken(newSeller._id.toString(), timestamp);
      newSeller.token = token;
      const savedSeller = await newSeller.save();
      const streamUser = await serverClient.upsertUser({name, id: savedSeller._id.toString(), role: 'seller'});
      return res.status(201).json({username: name, userId: savedSeller._id.toString(), token} );
    } catch (error) {
      //rollback funct
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
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        username,
        hashedPassword,
        fullName,
        phone_number,
        avatarURL,
        email
      }
      const newUser = new User(user);
      // token expires in 3 hours
      const timestamp = Math.floor(Date.now() / 1000) + (60 * 60 * 3);
      const serverClient = StreamChat.getInstance(api_key, api_secret, app_id);
      const token = serverClient.createToken(newUser._id.toString(), timestamp);
      newUser.token = token;
      const savedUser = await newUser.save();
      return res.status(201).json({...user, userId: savedUser._id.toString(), token} );
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const client = StreamChat.getInstance(api_key, api_secret);
      const { users } = await client.queryUsers({ name: username });
      const userdb = await User.findOne({username});
      const dbcustomer = userdb || (await Seller.findOne({name: username}));
      if (!users.length || !dbcustomer)
        return res.status(401).json({ message: 'User not found' });
      let success = await bcrypt.compare(password, dbcustomer.hashedPassword);
      // token expires in 3 hours
      const timestamp = Math.floor(Date.now() / 1000) + (60 * 60 * 3);
      const serverClient = connect(api_key, api_secret, app_id);
      const token = serverClient.createUserToken(users[0].id, timestamp);
      // console.log(users);
      if (success) {
        dbcustomer.token = token;
        await dbcustomer.save();
        res.status(200).json({
          token,
          username,
          userId: users[0].id,
        });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
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
      Object.keys(info).forEach(key => info[key] === undefined && delete info[key]);
      if ('password' in info) {
        info.hashedPassword = await bcrypt.hash(info['password'], 10);
        delete info['password'];
      }
      if (info.username) {
        const client = StreamChat.getInstance(api_key, api_secret);
        const { users } = await client.queryUsers({ id: constmID });
        if (!users.length)
          return res.status(401).json({ message: 'User not found' });
        const sUsers = await client.upsertUser({id: constmID, name: info.username});
        if (!sUsers)
          return res.status(401).json({ message: 'User not found' });
      }
      let dbcustomer = null;
      dbcustomer = await updateUser(constmID, info);
      if (!dbcustomer) {
        delete Object.assign(info, {['name']: info['username'] })['username'];
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
}


async function updateSeller(id, info) {
  let seller = null;
  try {
    seller = await Seller.findOneAndUpdate({_id: constmID}, info);
  } catch {}
  return seller;
}
async function updateUser(id, info) {
  const user = null;
  try {
    user = await User.findOneAndUpdate({name: info.username}, info);
  } catch {}
  return user;
}

export {AuthController};
