// tests (à retirer)
console.log(` --------> auth`);

const jwt = require('jsonwebtoken');

// const dotenv = require("dotenv");
// const result = dotenv.config();
//const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};