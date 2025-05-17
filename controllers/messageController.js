const db = require("../db/queries");

const getAllMessages = async (req, res) => {
  const messages = await db.getAllMessages(); // Fetch all messages from the database
  res.render("index", {
    title: "Mini Message Board",
    messages: messages,
  });
};

const getMessageById = async (req, res, next) => {
  const { id } = req.params; // Extract the id from the route parameter
  const messageResult = await db.getMessageById(id); // Fetch the message from the database
  if (!messageResult) {
    const err = new Error("Message not found");
    err.statusCode = 404;
    return next(err); // Pass error to error-handling middleware
  } else {
    res.render("message", {
      title: `Message from ${messageResult.username}`,
      message: messageResult,
    });
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params; // Extract the id from the route parameter
  if (!id) {
    return res.status(400).send("Bad Request: ID is required");
  }
  await db.deleteMessage(id); // Delete the message from the database
  res.redirect("/"); // Redirect to the home page after deletion
};

module.exports = {
  getMessageById,
  getAllMessages,
  deleteMessage,
};
