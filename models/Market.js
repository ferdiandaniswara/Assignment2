const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: String,
  golds: { type: Number, default: 1},
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
const Market =  mongoose.model('Market', marketSchema);


module.exports = Market