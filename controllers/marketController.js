const e = require('express');
const { findById } = require('../models/Market');
const Market = require('../models/Market');
const User = require('../models/User');

class marketController {
  static list(req, res, next) {
    Market.find({ _userId: req._userId })
    .select("_id _userId title")
    .exec()
    .then((results) => {
      const lists = {
        count: results.length,
        market: results.map(result =>{
          return {
            _id : result._id,
            _userId: result._userId,
            title : result.title,
            request :{
              type: "GET",
              url : `http://localhost:3000/market/${result._id}`
            }
          };
        })
      };
      res.status(200).json(lists);
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
      res.status(200).json({ 
        success: true, 
        message: 'Market has been created!',
        market: {
         id: market._id,
         owner: market._userId,
         title: market.title,
        }
      });
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
          golds: golds > 20 ? 20 : golds,
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
         }
       });
      })
      .catch(next);
  }
  
  static collect(req, res, next){
    const { id } = req.params;
    let golds;
    Market.findById(id)
    .then((market) => {
        golds = Math.floor((Date.now() - market.lastCollected)/ 60000);
        golds = golds > 20 ? 20 : golds;
        return Market.updateOne(({_id : id}, {lastCollected: Date.now()}));
    })
    .then((market)=>{
      return User.findById(req._userId);
    })
    .then((user)=>{
      if(user.resources.golds > 1000){
        throw {name: '1000'}
      }else{
      const resources = user.resources;
      resources.golds += golds;
      return User.updateOne({_id: req._userId},{resources: resources});
      }
    })
    .then((result)=>{
      res.status(200).json({
        success: true,
        message: `${golds} Golds has been added to your resources!`,
      })
    })
    .catch(next);
  }

}

module.exports = marketController;
