module.exports = (err, req, res, next) => {
    let code;
    let name = err.name;
    let message;
  
    switch (name) {
      case 'ALREADY_EXISTS':
        code = 409;
        message = `Account is already exists!`;
        break;
      case 'EXISTS':
        code = 409;
        message = `Name is already exists!`;
        break;  
      case 'TO_MUCH':
        code = 409;
        message = `Cannot have barrack more than 30!`;
        break;  
      case 'MONGOOSE_ERROR':
        code = 500;
        message = 'Database error!';
        break;
      case 'LOGIN_FAILED':
        code = 401;
        message = 'Email and password combination not found!';
        break;
      case '1000':
        code = 409;
        message = 'Cannot have more than 1000';
        break;  
      case 'REGISTER_FAILED':
        code = 401;
        message = 'Register data is invalid!';
        break;  
      case 'MISSING_TOKEN':
        code = 401;
        message = 'Missing access token!';
        break;
      case 'INVALID_TOKEN':
        code = 401;
        message = 'Invalid access token!';
        break;
      case 'NOT_FOUND':
        code = 404;
        message = 'Resource is not found!';
        break;
      case 'NOT_ENOUGH':
        code = 403;
        message = 'Resources is not enough!';
      break;
      case 'FORBIDDEN':
        code = 403;
        message = 'No access!';
        break;
      default:
        code = 500;
        message = 'Internal server error!';
    }
  
    res.status(code).json({ success: false, message });
  };
  
 