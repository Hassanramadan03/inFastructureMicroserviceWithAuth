
var bcrypt = require('bcryptjs');
var middleware = require('./authMiddleWare');
var createJWT = middleware.jwtgen;




var generateHash = function (password) {
    if(password)
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//       
var validPassword = function(password,hashPassword) {
  return  bcrypt.compare(password, hashPassword, null);
};
var Jwt = function (result) {
    if(result)
    return createJWT(result)
}

module.exports = {
    generateHash: generateHash,
    validPassword: validPassword,
    createJWT: Jwt
}
