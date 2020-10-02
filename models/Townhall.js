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
  health: { type: Number, default: 500},
  energy: { type: Number, default: 20, max: 50},
});

/*townhallSchema.pre('save', function (next) {
    Townhall.find()
      .then((result) => {
        if (!result) next({ name: 'ONLY_HAVE_ONE' });
        else {
          next();
        }
      })
      .catch((e) => next({ name: 'MONGOOSE_ERROR' }));
  });
*/
const Townhall =  mongoose.model('Townhall', townhallSchema);


module.exports = Townhall