const jwt = require('jsonwebtoken');
const Promise = require('promise');
const crypto = require('crypto');
/**
  Decode jwt token and store the user object in req.user, if token is exist
*/
exports.decodeJWT = function (req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization ? authorization.replace('Bearer ', '') : null;
  if (token) {
    exports.verifyToken(token).then((decoded) => {
      req.user = decoded;

      res.setHeader('authorization', exports.generateJwt(decoded));

      next();
    }, err => res.status(401).json({ success: false, message: 'Failed to authenticate token.', err }));
  } else {
    next();
  }
};

exports.verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (!err) {
        return resolve(decoded);
      }
      return reject(err);
    });
  });
};

exports.generateJwt = function (user) {
  const expiry = new Date();
  const signObj = user;

  // sessionTimeOut is in minutes
  const sessionTimeOut = parseInt(process.env.SESSION_TIMEOUT);
  signObj.exp = parseInt(expiry.getTime() / 1000) + 60 * sessionTimeOut;
  const token = jwt.sign(signObj, process.env.JWT_KEY);
  return token;
};

exports.generateJWTBasedOnTime = function (user, minutes) {
  const expiry = new Date();
  const signObj = user;

  // sessionTimeOut is in minutes
  const timeout = parseInt(minutes);
  signObj.exp = parseInt(expiry.getTime() / 1000) + 60 * timeout;
  const token = jwt.sign(signObj, process.env.JWT_KEY);
  return token;
};

exports.setPassword = function (object, password) {
  object.salt = crypto.randomBytes(16).toString('hex');
  object.hash = crypto.pbkdf2Sync(password, object.salt, 1000, 64, 'sha512').toString('hex');
  return object;
};

exports.validPassword = function (password, user) {
  const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
  return user.hash === hash;
};
