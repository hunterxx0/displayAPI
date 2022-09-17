const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
const router = require("./routes/index");

const PORT = process.env.PORT || 5000;
const app = express();

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

const TwilioClient = require("twilio")(accountSid, authToken);

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const { message, user: sender, type, members } = req.body;

  if (type === "message.new") {
    members
      .filter((member) => member.user_id !== sender.id)
      .forEach(({ user }) => {
        if (!user.online) {
          TwilioClient.messages
            .create({
              body: `You have a new message from ${message.user.fullName} - ${message.text}`,
              messagingServiceSid,
              to: user.phoneNumber,
            })
            .then((message) => console.log(message.sid))
            .done();
        }
      });
    return res.status(200).send("Message sent!");
  }
  return res.status(200).send("Not a new message request");
});

app.use("/auth", router);

app.listen(PORT, () => {
  console.log(`Server running on PORT {${PORT}}`);
});

module.exports = app;
