const Barrack = require('../models/Barrack');
const User = require('../models/User');

class barrackController {
    static list(req, res, next){
        Barrack.find({_userId: req._userId})
        .select("_id _userId title soldiers")
        .exec()
        .then((results) => {
        const response = {
            count: results.length,
            barrack: results.map(result =>{
            return {
                _id : result._id,
                _userId: result._userId,
                title : result.title,
                soldiers : result.soldiers,
                request :{
                type: "GET",
                url : `http://localhost:3000/barrack/${result._id}`
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
          const barrack = new Barrack ({
            _userId: req._userId,
            title: title,
          })
          return barrack.save();
        })
        .then((barrack)=>{
          res.status(200).json({ success: true, data: barrack});
        })
        .catch(next);
      } 
    
      static get(req, res, next){
        const { id } = req.params;
        Barrack.findById(id)
        .then((barrack)=>{
          if(barrack){
            const soldiers = Math.floor((Date.now() - barrack.lastCollected)/60000);
            res.status(200).json({
              success:true,
              data: barrack,
              soldiers: soldiers > 50 ? 50 : soldiers,
            });
          }else{
            throw {name: 'NOT_FOUND'};
          }
        })
        .catch(next);
      }

    static put(req, res, next){
        const {title} = req.body;
        Barrack.findOne({_id: req.params.id})
            .then((result)=>{
                result.title = title;
                return result.save();
            })
            .then((result)=>{
                res.status(200).json({ 
                    success: true,
                    updatedBarrack: {
                        request :{
                          type: "GET",
                          url :  `http://localhost:3000/barrack/${result._id}`
                       }
                    }
                });
            })
            .catch(next);
    }

    static delete(req, res, next){
        Barrack.findOne({_id : req.params.id})
        .then((result)=>{
            return result.remove();
        })
        .then((result)=>{
            res.status(200).json({
                success:true, 
                deletedMarket: {
                    _id : result._id,
                    _userId: result._userId,
                    title : result.title,
                    soldiers : result.soldiers
                  }
            });
        })
        .catch(next);
    }
}

module.exports = barrackController;