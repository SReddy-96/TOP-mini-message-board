const { Router } = require("express");
const {
  postNewMessage,
  getNewMessageForm,
} = require("../controllers/newController");

const newRouter = Router();

newRouter.get("/", getNewMessageForm);
newRouter.post("/", postNewMessage);

module.exports = newRouter;
