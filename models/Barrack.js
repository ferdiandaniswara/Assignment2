const mongoose = require('mongoose');

const barrackSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        reg: 'User',
        required: true,
    },
    title: String,
    soldiers: {type:Number, default: 1},

});

const Barrack = mongoose.model('Barrack', barrackSchema);
module.exports = Barrack