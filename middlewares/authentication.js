const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { access_token } = req.headers;
  if (access_token) {
    jwt.verify(access_token, 'SALT_ACADEMY', (err, decoded) => {
      if (err) next({ name: 'INVALID_TOKEN' });
      else {
        req._userId = decoded._id;
        next();
      }
    });
  } else next({ name: 'MISSING_TOKEN' });
};
