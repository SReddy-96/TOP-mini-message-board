const { Router } = require("express");
const {
  getMessageById,
  getAllMessages,
  deleteMessage
} = require("../controllers/messageController");

const indexRouter = Router();

indexRouter.get("/", getAllMessages);

// using the messageController to handle the /message/:id route
indexRouter.get("/message/:id", getMessageById);

indexRouter.post("/message/:id/delete", deleteMessage);

module.exports = indexRouter;
