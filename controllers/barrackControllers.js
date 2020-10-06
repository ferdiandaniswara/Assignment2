const Barrack = require('../models/Barrack');

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
        const { title } = req.body;
        const barrack = new Barrack({
            _userId: req._userId,
            title: title,
        });
        barrack
        .save()
        .then((result)=>{
            res.status(201).json({
                success: true, 
                _id : result._id,
                _userId: result._userId,
                title : result.title,
                soldiers : result.soldiers,
                request :{
                type: "GET",
                url :  `http://localhost:3000/barrack/${result._id}`
            }
            });
        })
        .catch(next);
    }
    
    static get(req, res, next){
        Barrack.findOne({_id: req.params.id})
            .then((result)=>{
                res.status(200).json({ 
                    success: true,
                    Barrack: {
                        _id : result._id,
                        _userId: result._userId,
                        title : result.title,
                        soldiers : result.soldiers,
                      }
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
                    soldiers : result.soldiers
                  }
            });
        })
        .catch(next);
    }
}

module.exports = barrackController;