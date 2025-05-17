const db = require("../db/queries");

exports.getNewMessageForm = (req, res) => {
  res.render("form", { title: "Add a new message" });
};
exports.postNewMessage = async (req, res) => {
  // using req.body to get the post data.
  const { text, username } = req.body;
  await db.insertMessage(text, username); // Create a new message object
  res.redirect("/");
};
