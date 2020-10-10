const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class UserController {
  static register(req, res, next) {
    const { email, password, nickname } = req.body;
    const user = new User({ email, password, nickname });
    user
      .save()
      .then((user) => {
        res.status(201).json({ success: true, User: {
           _id: user._id,
            email: user.email, 
            nickname,
            resources: user.resources
        } 
      });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const access_token = jwt.sign({ _id: user._id }, 'SALT_ACADEMY');
          res.status(200).json({ success: true, access_token });
        } else throw { name: 'LOGIN_FAILED' };
      })
      .catch(next);
    }
    
}

module.exports = UserController;
