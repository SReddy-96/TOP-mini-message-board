const getMessageById = (req, res, next) => {
  const { id } = req.params; // Extract the id from the route parameter
  const messageResult = req.messages.find((message) => message.id === id);
  if (!messageResult) {
    const err = new Error("Message not found");
    err.statusCode = 404;
    return next(err); // Pass error to error-handling middleware
  } else {
    res.render("message", {
      title: `Message from ${messageResult.user}`,
      message: messageResult,
    });
  }
};

module.exports = {
  getMessageById,
};
