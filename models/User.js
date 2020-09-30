const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function (next) {
  User.findOne({ email: this.email })
    .then((user) => {
      if (user) next({ name: 'ALREADY_EXISTS' });
      else {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
        next();
      }
    })
    .catch((e) => next({ name: 'MONGOOSE_ERROR' }));
});

const User = mongoose.model('User', userSchema);

module.exports = User;
