const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: String,
  lastCollected: {
    type: Number,
    default: Date.now(),
  },
});



const Market =  mongoose.model('Market', marketSchema);


module.exports = Market