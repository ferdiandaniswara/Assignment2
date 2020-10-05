const Barrack = require('../models/Barrack');

class barrackController {
    static list(req, res, next){
        Barrack.find({_userId: req._userId})
        .then((result)=>{
            res.status(200).json({ success: true, data: result});
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
            res.status(201).json({success: true, data: result});
        })
        .catch(next);
    }
    static get(req, res, next){
        Barrack.findOne({_id: req.params.id})
            .then((result)=>{
                res.status(200).json({ success: true, data: result});
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
                res.status(200).json({ success: true, data: result});
            })
            .catch(next);
    }

    static delete(req, res, next){
        Barrack.findOne({_id : req.params.id})
        .then((result)=>{
            return result.remove();
        })
        .then((result)=>{
            res.status(200).json({success:true, data:{deleted: result}});
        })
        .catch(next);
    }
}

module.exports = barrackController;