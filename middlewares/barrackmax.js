const Barrack = require('../models/Barrack');

module.exports = (req, res, next) => {
    Barrack.find()
        .then((barrack)=>{
            if(barrack.length > 30){
              throw { name: 'TO_MUCH'}
            }else{
                next()
           } 
    })
        .catch(next);
};