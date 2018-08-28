const moment = require('moment');
const jwt = require('jwt-simple');
const config = require('../config/config');
/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
const jwtgen = function createJWT(user) {
  const payload = {
    data: user,
    iat: moment().unix(),
    exp: moment().add(1, 'months').unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

const authMiddleware = function () {
  return function ensureAuthenticated(req, res, next) {
    
    if (!req.header('Authorization')) {
      return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    const token = req.header('Authorization').split(' ')[1];
    let payload = null;
    try {
      payload = jwt.decode(token, config.TOKEN_SECRET);
    } catch (err) {
      return res.status(401).send({ message: err.message });
    }
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' });
    }

    req.user = payload.data;
    next();
  };
};


module.exports.authMiddleware = authMiddleware;
module.exports.jwtgen = jwtgen;
