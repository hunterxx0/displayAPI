import {StreamChat} from 'stream-chat';


const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

class UserController {
  static async getUserRole(req, res) {
    try {
      const { userId } = req.params;

      const client = StreamChat.getInstance(api_key, api_secret);
      const { users } = await client.queryUsers({ id: userId });
      //console.log(users[0].role);
      if (!users.length)
        return res.status(400).json({ message: 'User not found' });
      return res.status(200).json({ role: users[0]?.role });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = {UserController};
