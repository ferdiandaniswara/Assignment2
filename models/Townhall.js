const mongoose = require('mongoose');
const townhallController = require('../controllers/townhallController');

const townhallSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  description: String,
});

townhallSchema.pre('save', function (next) {
    Townhall.findOne({ title: this.title })
      .then((user) => {
        if (user) next({ name: 'ALREADY_EXISTS' });
        else {
          next({name: 'ALREADY_EXISTS'});
        }
      })
      .catch((e) => next({ name: 'MONGOOSE_ERROR' }));
  });

const Townhall =  mongoose.model('Townhall', townhallSchema);


module.exports = Townhall