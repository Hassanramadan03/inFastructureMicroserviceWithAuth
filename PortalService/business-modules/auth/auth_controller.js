const renderResponseUtil = require('../../utils/RenderResponseUtil');
const requestPromise = require('request-promise')
const requestOptions=require('./auth_service').requestOption;
module.exports = {
    signup,
    signin,

}
async function signup(req, res) {
    try {
       
        const result=await requestPromise(requestOptions('signup',req.body));
        renderResponseUtil.sendResponse(req, res, result)
    } catch (error) {
        res.send(error);
    }
}
async function signin(req, res, next) {
    try {
        
        const result=await requestPromise(requestOptions('signin',req.body))
        renderResponseUtil.sendResponse(req, res, result)
    } catch (error) {
        res.send(error);
    }

}
