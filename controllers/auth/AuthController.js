import { connect } from 'getstream';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import {StreamChat} from 'stream-chat';
import {User} from '../../models/user.js';
import {Seller} from '../../models/seller.js';

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;
const jwtKey = process.env.JWTKEY;

class AuthController {
  static async sellerSignup(req, res) {
    try {
      const {
        name,
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
      const serverClient = connect(api_key, api_secret, app_id);
      const token = serverClient.createUserToken({
        id: newSeller._id.toString(),
        role: "seller"
      }, jwtKey, timestamp);
      newUser.token = token;
      const savedSeller = await newSeller.save();
      return res.status(201).json({...seller, userId: savedSeller._id.toString(), token} );
    } catch (error) {
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
      const serverClient = connect(api_key, api_secret, app_id);
      const token = serverClient.createUserToken({
        id: newUser._id.toString(),
        role: "user"
      }, jwtKey, timestamp);
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

      const serverClient = connect(api_key, api_secret, app_id);
      const client = StreamChat.getInstance(api_key, api_secret);
      const { users } = await client.queryUsers({ name: username });
      const userdb = await User.findOne({username});
      const dbcustomer = userdb || (await Seller.findOne({name: username}));
      if (!users.length || !dbcustomer)
        return res.status(401).json({ message: 'User not found' });
      let success = await bcrypt.compare(password, users[0].hashedPassword);
      if (success) success = await bcrypt.compare(password, dbcustomer.hashedPassword);
      // token expires in 3 hours
      const timestamp = Math.floor(Date.now() / 1000) + (60 * 60 * 3);
      console.log(users[0].id);
      console.log(typeof users[0].id);
      const token = serverClient.createUserToken();
      // console.log(users);
      if (success) {
        dbcustomer.token = token;
        await dbcustomer.save();
        res.status(200).json({
          token,
          role: users[0].role,
          fullName: users[0].fullName,
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
      Object.keys(info).forEach(key => info[key] === undefined && delete info[key]);
      if (password in info) {
        info.hashedPassword = await bcrypt.hash(password, 10);
      }
      const client = StreamChat.getInstance(api_key, api_secret);
      const { users } = await client.queryUsers({ name: (info.username || info.name) });
      if (!users.length)
        return res.status(401).json({ message: 'User not found' });
      const sUsers = await client.upsertUser(info);
      if (!sUsers)
        return res.status(401).json({ message: 'User not found' });
      let dbcustomer;
      if (info.name) dbcustomer = await Seller.findOneAndUpdate({name: info.name}, info);
      else if (info.username) dbcustomer = await User.findOneAndUpdate({name: info.username}, info);
      if (!dbcustomer) {
        await client.upsertUser(users[0]);
        return res.status(401).json({ message: 'User not found' });
      }
      res.status(200).json('User Updated');
    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error });
    }
  }
}

export {AuthController};
