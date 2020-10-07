const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    trim:true, 
    required: true,
    unique: true,
    index: true,
   },
  password: { type: String, trim:true, required: true,  minlength:7 },
  nickname: String,
  resources:{
    golds: {type: Number, default: 100},
    foods: {type: Number, default: 100},
    soldiers: {type: Number, default: 0},
},
  
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
