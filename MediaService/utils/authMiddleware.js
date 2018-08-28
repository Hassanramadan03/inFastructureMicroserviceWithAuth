const requestPromise = require('request-promise')
const authMiddleware = function () {
  return  ensureAuthenticated=async(req, res, next)=>{
    const options={
      method:'post',
      uri:'http://localhost:8001/auth/authorize'
    }
    const callback = await requestPromise(options);
    const isAuthorized=JSON.parse(callback).isAuthorized;
    if (!isAuthorized)return;
    else next();
  };
};


module.exports.authMiddleware = authMiddleware;
