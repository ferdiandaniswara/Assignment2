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

marketSchema.pre('save', function (next){
  Market.findOne({title: this.title})
  .then((result)=>{
    if(result) next ({ name : 'EXISTS'});
    else{
      next();
    }
  })
  .catch(next)
});

const Market =  mongoose.model('Market', marketSchema);


module.exports = Market