const Market = require('../models/Market');

module.exports = (req, res, next) => {
  Market.findOne({ _id: req.params.id })
    .then((market) => {
      if (market) {
        if (market._userId.toString() === req._userId) next();
        else throw { name: 'FORBIDDEN' };
      } else throw { name: 'NOT_FOUND' };
    })
    .catch(next);
};
