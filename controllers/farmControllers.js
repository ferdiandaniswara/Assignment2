const Farm = require('../models/Farm');

class farmController {
  static list(req, res, next) {
    Farm.find({ _userId: req._userId })
    .then((result) => {
      res.status(200).json({ success: true, data: result });
    })
    .catch(next);
  }

  static post(req, res, next) {
    const { title } = req.body;
    const farm = new Farm({
      _userId: req._userId,
      title: title,
    });
    farm
      .save()
      .then((result) => {
        res.status(201).json({ success: true, data: result });
      })
      .catch(next);
  }

  static get(req, res, next) {
    Farm.findOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({ succes: true, data: result });
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
        res.status(200).json({ succes: true, data: result });
      })
      .catch(next);
  }

 

  static delete(req, res, next) {
    Farm.findOne({ _id: req.params.id })
      .then((result) => {
        return result.remove();
      })
      .then((result) => {
        res.status(200).json({ success: true, data: { deleted: result } });
      })
      .catch(next);
  }
}

module.exports = farmController;
