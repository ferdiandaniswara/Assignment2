const Barrack = require('../models/Barrack');
const User = require('../models/User');

class barrackController {
    static list(req, res, next){
        Barrack.find({_userId: req._userId})
        .select("_id _userId title")
        .exec()
        .then((results) => {
        const lists = {
            Total: results.length,
            barrack: results.map(result =>{
            return {
                _id : result._id,
                _userId: result._userId,
                title : result.title,
                request :{
                type: "GET",
                url : `http://localhost:3000/barrack/${result._id}`
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
            if(user.resources.golds >= 30 && user.resources.foods >= 30){
              const resources = user.resources;
                resources.golds -= 30;
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
          const barrack = new Barrack ({
            _userId: req._userId,
            title: title,
          })
          return barrack.save();
        })
        .then((barrack)=>{
          res.status(200).json({ 
            success: true, 
            message: 'Barrack has been created!',
            Barrack: {
             id: barrack._id,
             owner: barrack._userId,
             title: barrack.title,
            }
          });
        })
        .catch(next);
      } 
    
      static get(req, res, next){
        const { id } = req.params;
        Barrack.findById(id)
        .then((barrack)=>{
            const soldiers = Math.floor((Date.now() - barrack.lastCollected)/60000);
            res.status(200).json({
              success:true,
              data: barrack,
              soldiers: soldiers > 10 ? 10 : soldiers,
            });
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
                  }
            });
        })
        .catch(next);
    }
    static collect(req, res, next){
        const { id } = req.params;
        let soldiers;
        Barrack.findById(id)
        .then((barrack) => {
            soldiers = Math.floor((Date.now() - barrack.lastCollected)/ 60000);
            soldiers = soldiers > 10 ? 10 : soldiers;
            return Barrack.updateOne({_id : id},{lastCollected :  Date.now()})
        })
        .then((barrack)=>{
          return User.findById(req._userId);
        })
        .then((user)=>{
          if(user.resources.soldiers > 500){
            throw {name:'1000'}
          }else{
          const resources = user.resources;
          resources.soldiers += soldiers;
          return User.updateOne({_id: req._userId},{resources: resources});
          }
        })
        .then((result)=>{
          res.status(200).json({
            success: true,
            message: `${soldiers} foods has been added to your resources!`,
          })
        })
        .catch(next);
      }


}

module.exports = barrackController;