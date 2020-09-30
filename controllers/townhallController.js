const Townhall = require('../models/Townhall');

class townhallController {
  static list(req, res, next) {
    Townhall.find({ _userId: req._userId })
    .then((result) => {
      res.status(200).json({ success: true, data: result });
    })
    .catch(next);
  }

  static post(req, res, next) {
    const { title, description } = req.body;
    const townhall = new Townhall({
      _userId: req._userId,
      title,
      description,
    });
    townhall
      .save()
      .then((result) => {
        res.status(201).json({ success: true, data: result });
      })
      .catch(next);
  }

  static get(req, res, next) {
    Townhall.findOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({ succes: true, data: result });
      })
      .catch(next);
  }

  static put(req, res, next) {
    const { title, description } = req.body;
    Townhall.findOne({ _id: req.params.id })
      .then((result) => {
        result.title = title;
        result.description = description;
        return result.save();
      })
      .then((result) => {
        res.status(200).json({ succes: true, data: result });
      })
      .catch(next);
  }

  static delete(req, res, next) {
    Townhall.findOne({ _id: req.params.id })
      .then((result) => {
        return resul.remove();
      })
      .then((result) => {
        res.status(200).json({ success: true, data: { deleted: result } });
      })
      .catch(next);
  }
}

module.exports = townhallController;
