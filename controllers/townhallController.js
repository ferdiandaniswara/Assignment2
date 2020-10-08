const User = require('../models/User');

class TownhallController {
  static get(req, res, next) {
    User.findById(req._userId)
      .then((user) => {
        if (user) {
          res.status(200).json({ success: true, data: user.resources });
        } else {
          throw 'USER_NOT_FOUND';
        }
      })
      .catch(next);
  }
}

module.exports = TownhallController;
