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

farmSchema.pre('save', function(next){
    Farm.findOne({title: this.title})
    .then((result)=>{
        if(result) next ({name : 'EXISTS'});
        else{
            next();
        }
    })
    .catch(next);
})

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm