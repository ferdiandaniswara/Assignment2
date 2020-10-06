const Market = require('../models/Market');

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

  static post(req, res, next) {
    const { title } = req.body;
    const market = new Market({
      _userId: req._userId,
      title: title,
    });
    market
      .save()
      .then((result) => {
        res.status(201).json({
           success: true,
           createdMarket: {
            _id : result._id,
            _userId: result._userId,
            title : result.title,
            golds : result.golds,
            request :{
              type: "GET",
              url :`http://localhost:3000/market/${result._id}`
           }
          }
        });
      })
      .catch(next);
  }

  static get(req, res, next) {
    Market.findOne({ _id: req.params.id })
      .then((result) => {
        res.status(201).json({
          success: true,
          Market: {
           _id : result._id,
           _userId: result._userId,
           title : result.title,
           golds : result.golds,
         }
       });
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
}

module.exports = marketController;
