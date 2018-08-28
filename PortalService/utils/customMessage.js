class Message {
}

class ErrorMessage extends Message {
  constructor(code, err) {
    super();
    this.err = err.valueOf();
    this.code = code;
    this.type = 'Error';
  }
}


class SuccessMessage extends Message {
  constructor(code, data) {
    super();
    this.data = data;
    this.code = code;
    this.type = 'Success';
  }
}

ErrorMessage.DATABASE_ERROR = 'DATABASE_ERROR';
ErrorMessage.CREATING_OBJECT_ERROR = 'CREATING_OBJECT_ERROR';
ErrorMessage.DELETING_OBJECT_ERROR = 'DELETING_OBJECT_ERROR';
ErrorMessage.UPDATING_OBJECT_ERROR = 'UPDATING_OBJECT_ERROR';
ErrorMessage.VALIDATING_OBJECT_ERROR = 'VALIDATING_OBJECT_ERROR';
ErrorMessage.OBJECT_NOT_FOUND = 'OBJECT_NOT_FOUND';
ErrorMessage.INVALID_USERNAME_PASSWORD = 'INVALID_USERNAME_PASSWORD';
ErrorMessage.INVALID_PARAMS = 'INVALID_PARAMS';
ErrorMessage.INVALID_REQUEST_BODY = 'INVALID_REQUEST_BODY';
ErrorMessage.FETCHING_DATA_ERROR = 'FETCHING_DATA_ERROR';
ErrorMessage.INVALID_OLD_PASSWORD= 'INVALID_OLD_PASSWORD';
ErrorMessage.ASSIGNING_TROPHY = 'ASSIGNING_TROPHY';
SuccessMessage.CREATING_OBJECT_SUCCESS = 'CREATING_OBJECT_SUCCESS';
SuccessMessage.DELETING_OBJECT_SUCCESS = 'DELETING_OBJECT_SUCCESS';
SuccessMessage.UPDATING_OBJECT_SUCCESS = 'UPDATING_OBJECT_SUCCESS';
SuccessMessage.GETTING_DATA = 'GETTING_DATA';
SuccessMessage.RESETTING_PASSWORD_SUCCESS = 'RESETTING_PASSWORD_SUCCESS';
SuccessMessage.FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
module.exports.SuccessMessage = SuccessMessage;
module.exports.ErrorMessage = ErrorMessage;
