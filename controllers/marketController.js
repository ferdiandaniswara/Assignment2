const Market = require('../models/Market');

class marketController {
  static list(req, res, next) {
    Market.find({ _userId: req._userId })
    .then((result) => {
      res.status(200).json({ success: true, data: result });
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
        res.status(201).json({ success: true, data: result });
      })
      .catch(next);
  }

  static get(req, res, next) {
    Market.findOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({ succes: true, data: result });
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
        res.status(200).json({ succes: true, data: result });
      })
      .catch(next);
  }

 

  static delete(req, res, next) {
    Market.findOne({ _id: req.params.id })
      .then((result) => {
        return result.remove();
      })
      .then((result) => {
        res.status(200).json({ success: true, data: { deleted: result } });
      })
      .catch(next);
  }
}

module.exports = marketController;
