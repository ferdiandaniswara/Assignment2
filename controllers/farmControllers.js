const Farm = require('../models/Farm');
const User = require('../models/User');

class farmController {
  static list(req, res, next) {
    Farm.find({ _userId: req._userId })
    .select("_id _userId title foods")
    .exec()
    .then((results) => {
      const response = {
        count: results.length,
        farm: results.map(result =>{
          return {
            _id : result._id,
            _userId: result._userId,
            title : result.title,
            foods : result.foods,
            request :{
              type: "GET",
              url : `http://localhost:3000/farm/${result._id}`
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
        if(user.resources.golds >= 10 && user.resources.foods >= 30){
          const resources = user.resources;
          resources.golds -= 10;
          resources.foods -= 30;
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
      const farm = new Farm ({
        _userId: req._userId,
        title: title,
      })
      return farm.save();
    })
    .then((farm)=>{
      res.status(200).json({ success: true, data: farm});
    })
    .catch(next);
  } 

  static get(req, res, next){
    const { id } = req.params;
    Farm.findById(id)
    .then((farm)=>{
      if(farm){
        const foods = Math.floor((Date.now() - farm.lastCollected)/60000);
        res.status(200).json({
          success:true,
          data: farm,
          foods: foods > 20 ? 20 : foods,
        });
      }else{
        throw {name: 'NOT_FOUND'};
      }
    })
    .catch(next);
  }

  static put(req, res, next) {
    const { title} = req.body;
    Farm.findOne({ _id: req.params.id })
      .then((result) => {
        result.title = title;
        return result.save();
      })
      .then((result) => {
        res.status(200).json({
           succes: true, 
           updatedFarm: {
            request :{
              type: "GET",
              url :`http://localhost:3000/farm/${result._id}`
           }
          }
        });
      })
      .catch(next);
  }

 

  static delete(req, res, next) {
    Farm.findOne({ _id: req.params.id })
      .then((result) => {
        return result.remove();
      })
      .then((result) => {
        res.status(200).json({ 
          success: true, 
          deletedMarket: {
            _id : result._id,
            _userId: result._userId,
            title : result.title,
            foods : result.foods
          } 
        });
      })
      .catch(next);
  }
  static collect(req, res, next){
    const { id } = req.params;
    let foods;
    Farm.findById(id)
    .then((farm) => {
      if(farm){
        foods = Math.floor((Date.now() - farm.lastCollected)/ 60000);
        foods = foods > 20 ? 20 : foods;
        farm.lastCollected = Date.now();
        return farm.save();
      } else{
        throw 'NOT_FOUND';
      }
    })
    .then((farm)=>{
      return User.findById(req._userId);
    })
    .then((user)=>{
      const resources = user.resources;
      resources.foods += foods;
      return User.updateOne({_id: req._userId},{resources: resources});
    })
    .then((result)=>{
      res.status(200).json({
        success: true,
        message: `${foods} foods has been added to your resources`,
        data : result
      })
    })
    .catch(next);
  }
}

module.exports = farmController;
