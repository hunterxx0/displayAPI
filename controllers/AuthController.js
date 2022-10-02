import { connect } from 'getstream';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import {StreamChat} from 'stream-chat';
import {User} from '../models/user.js';
import {Seller} from '../models/seller.js';

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

class AuthController {
  static async signup(req, res) {
    try {
      const { username, password, fullName, phoneNumber: phone_number, avatarURL, email } = req.body;
      const serverClient = connect(api_key, api_secret, app_id);
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
      console.log(newUser);
      const token = serverClient.createUserToken(newUser._id.toString());
      newUser.token = token;
      console.log(newUser);
      const savedUser = await newUser.save();
      console.log(savedUser);
      return res.status(201).json({...user, userId: savedUser._id.toString(), token} );
    } catch (error) {
      console.log(error);
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
      // const updateResponse = await client.upsertUser({
      //   id: users[0].id,
      //   role: 'admin',
      // });
      // console.log(updateResponse);
      const dbcustomer = userdb || (await Seller.findOne({name: username}));
      if (!users.length || !dbcustomer)
        return res.status(401).json({ message: 'User not found' });
      let success = await bcrypt.compare(password, users[0].hashedPassword);
      if (success) success = await bcrypt.compare(password, dbcustomer.hashedPassword);

      const token = serverClient.createUserToken({
        id: users[0].id,
        role: userdb ? "user" : "seller"
      });
      // console.log(users);
      if (success) {
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
      // ads;
      // console.log(error);

      res.status(500).json({ message: error });
    }
  }
}

export {AuthController};
