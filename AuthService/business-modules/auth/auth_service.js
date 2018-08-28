const SuccessMessage = require('../../utils/customMessage').SuccessMessage;
const ErrorMessage = require('../../utils/customMessage').ErrorMessage;
const User = require('../../models/user');
const generateHash = require('../../utils/utlis').generateHash;
const validPassword = require('../../utils/utlis').validPassword;
const creatJwt = require('../../utils/utlis').createJWT;

module.exports = {
    signin:async function (_user) {
   
        return new Promise(async (resolve, reject) => {
            try {
                const _isUser = await User.findOne({ 'local.email': _user.email });
                 
                
                if (_isUser) {
                    const isMatch = await validPassword(_user.password, _isUser.local.password);
                     
                    if (isMatch) {
                        resolve({ "success": true, token: creatJwt(_isUser), type: _isUser.type, userId: _isUser._id, user: { firstname: _isUser.local.firstname, lastname: _isUser.local.lastname } });
                    } else { resolve({ "success": false, message: 'Invalid Password...!' }); }
                } else {
                    resolve({ "success": false, message: 'Invalid Email...!' })
    
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    signup:async function (_user) {
        
        return new Promise(async (resolve, reject) => {
            try {
                const Ouser = new User({
                    local: {
                        firstname: _user.firstName,
                        lastname: _user.lastName,
                        email: _user.email,
                        password: generateHash(_user.password)
                    }
                });
                 
                
                const result = await User.findOne({ 'local.email': _user.email });
                 
                if (result) {
                    console.log(result);
                    
                    resolve({ "success": false, message: 'Email Is Already Existed...!' });
                } else {
                    const _createdUser = await Ouser.save();
                    if (_createdUser) resolve({ "success": true, token: creatJwt(_createdUser), type: _createdUser.type, userId: _createdUser._id, user: { firstname: _createdUser.local.firstname, lastname: _createdUser.local.lastname, avatar: _createdUser.local.avatar } });
                    else resolve({ "success": false, message: 'Registration failed...!' });
                }
            } catch (error) {
                console.log(error)
                reject(error);
            }
        })
    }
}
 
