const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidID = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `not valid ID`));
  }
  next();
};

module.exports = isValidID;
