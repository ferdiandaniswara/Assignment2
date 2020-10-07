const { findById } = require('../models/Market');
const Market = require('../models/Market');
const User = require('../models/User');

class marketController {
  static list(req, res, next) {
    Market.find({ _userId: req._userId })
    .select("_id _userId title golds")
    .exec()
    .then((results) => {
      const response = {
        count: results.length,
        market: results.map(result =>{
          return {
            _id : result._id,
            _userId: result._userId,
            title : result.title,
            golds : result.golds,
            request :{
              type: "GET",
              url : `http://localhost:3000/market/${result._id}`
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(next);
  }

  static post(req, res, next){
    User.findById(req._userId)
    .then((user)=>{
      if(user){
        if(user.resources.golds >= 30 && user.resources.foods >= 10){
          const resources = user.resources;
            resources.golds -= 30;
            resources.foods -= 10;
          return User.updateOne({_id: req._userId}, {resources : resources});
        }else{
          throw {name: 'NOT_ENOUGH'};
        }
      }else{
        throw {name: 'NOT_FOUND'};
      }
    })
    .then((user)=>{
      const { title } = req.body;
      const market = new Market ({
        _userId: req._userId,
        title: title,
      })
      return market.save();
    })
    .then((market)=>{
      res.status(200).json({ success: true, data: market});
    })
    .catch(next);
  } 

  static get(req, res, next){
    const { id } = req.params;
    Market.findById(id)
    .then((market)=>{
      if(market){
        const golds = Math.floor((Date.now() - market.lastCollected)/60000);
        res.status(200).json({
          success:true,
          data: market,
          golds: golds > 50 ? 50 : golds,
        });
      }else{
        throw {name: 'NOT_FOUND'};
      }
    })
    .catch(next);
  }

  static put(req, res, next) {
    const { title} = req.body;
    Market.findOne({ _id: req.params.id })
      .then((result) => {
        result.title = title;
        return result.save();
      })
      .then((result) => {
        res.status(201).json({
          success: true,
          updatedMarket: {
           request :{
             type: "GET",
             url : `http://localhost:3000/market/${result._id}`
          }
         }
       });
      })
      .catch(next);
  }
  static delete(req, res, next) {
    Market.findOne({ _id: req.params.id })
      .then((result) => {
        return result.remove();
      })
      .then((result) => {
        res.status(201).json({
          success: true,
          deletedMarket: {
           _id : result._id,
           _userId: result._userId,
           title : result.title,
           golds : result.golds
         }
       });
      })
      .catch(next);
  }
  static collect(req, res, next){
    const golds = 0;
    Market.findOne({_id : req.params.id})
    .then((market)=>{
      golds = 3;
      return User.findOne({_id : req._userId});
    })
    then(user =>{
      user.resources.golds += golds;
      return user.save()
    })
    .then(user =>{
      res.status(200).json({success: true})
    })
    //console.log('salah')
    .catch(next)
    
  }

}

module.exports = marketController;
