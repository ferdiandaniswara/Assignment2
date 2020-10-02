const Townhall = require('../models/Townhall');

module.exports = (req, res, next) => {
  Townhall.findOne({ _id: req.params.id })
    .then((townhall) => {
      if (townhall) {

        if (townhall._userId.toString() === req._userId) next();
        else throw { name: 'FORBIDDEN' };
      } else throw { name: 'NOT_FOUND' };
    })
    .catch(next);
};
