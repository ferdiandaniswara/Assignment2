const mongoose = require('mongoose');

const barrackSchema = new mongoose.Schema({
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

barrackSchema.pre('save', function(next){
    Barrack.findOne({title: this.title})
    .then((result)=>{
        if(result) next ({ name : 'EXISTS'});
        else{
            next();
        }
    })
    .catch(next)
});

const Barrack = mongoose.model('Barrack', barrackSchema);
module.exports = Barrack