const Farm = require('../models/Farm');

module.exports = (req, res, next) =>{
    Farm.findOne({_id: req.params.id})
     .then((farm)=>{
         if(farm){
             if(farm._userId.toString() === req._userId) next();
             else throw { name: 'FORBIDDEN'};
         }   else throw { name: 'NOT_FOUND'};
     })
     .catch(next);
};