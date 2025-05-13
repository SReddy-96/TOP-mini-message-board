const { Router } = require("express");
const { getMessageById } = require("../controllers/messageController");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Message Board",
    messages: req.messages,
  });
});

// using the messageController to handle the /message/:id route
indexRouter.get("/message/:id", getMessageById);

module.exports = indexRouter;
