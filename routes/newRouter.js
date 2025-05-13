const { Router } = require("express");
const { randomUUID } = require("node:crypto");

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.render("form", { title: "Add a new message" });
});

newRouter.post("/", (req, res) => {
  // using req.body to get the post data.
  const { user, text } = req.body;
  const newMessage = {
    id: randomUUID(),
    text: text,
    user: user,
    added: new Date(),
  };
  req.messages.push(newMessage);
  res.redirect("/");
});

module.exports = newRouter;
