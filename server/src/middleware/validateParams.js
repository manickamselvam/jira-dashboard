const mongoose = require('mongoose');

const validateParams = (paramNames) => (req, res, next) => {
  for (const name of paramNames) {
    const value = req.params[name];
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return res
        .status(400)
        .json({ message: `${name} is not a valid ObjectId` });
    }
  }
  next();
};

module.exports = validateParams;
