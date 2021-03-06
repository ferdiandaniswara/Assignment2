const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
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



const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm