function twilPost(req, res) {
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
}

module.exports = twilPost;