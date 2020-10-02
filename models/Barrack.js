const mongoose = require('mongoose');
const barrackController = require('../controllers/barrackController');

const barrackSchema = new mongoose.Schema({
    _townId: {
        type: mongoose.Schema.Types.ObjectId,
        reg: 'Townhall',
        required: true,
    },
    soldier: { type: Number, default: 2}
})