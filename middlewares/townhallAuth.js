const townhall = require('../models/Townhall');

module.exports = (req, res, next) => {
  Todo.findOne({ _id: req.params.id })
    .then((townhall) => {
      if (townhall) {
        if (todo._userId.toString() === req._userId) next();
        else throw { name: 'FORBIDDEN' };
      } else throw { name: 'NOT_FOUND' };
    })
    .catch(next);
};
