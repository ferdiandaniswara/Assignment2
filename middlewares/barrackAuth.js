const Barrack = require('../models/Barrack');

module.exports = (req, res, next) => {
    Barrack.findOne({_id: req.params.id})
        .then((barrack)=>{
          if(barrack){
            if(barrack._userId.toString()===req._userId) next();
            else throw { name: 'FORBIDDEN'};
           } else throw { name: 'NOT_FOUND'};
        })
        .catch(next);
};