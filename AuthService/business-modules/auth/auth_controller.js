const renderResponseUtil = require('../../utils/RenderResponseUtil');
const auth_service = require('./auth_service');
module.exports = {
    signup: async function (req, res, next) {
        try {
            
            if (req.body.email) {
                const Sign_in = await auth_service.signUp(req.body);
                renderResponseUtil.sendResponse(req, res, Sign_in)
            }else{
                renderResponseUtil.sendResponse(req, res,'there is no body Entered ..! :(')
            }
        } catch (error) {
            res.send(error);
        }

    },
    signin: async function (req, res, next) {
        try {
            const Sign_in = await auth_service.signin(req.body);
            renderResponseUtil.sendResponse(req, res, Sign_in)
        } catch (error) {
            res.send(error);
        }

    },
    authorize: async function (req, res, next) {
        try {
            renderResponseUtil.sendResponse(req, res, {isAuthorized:true})
        } catch (error) {
            res.send(error);
        }

    }
}

