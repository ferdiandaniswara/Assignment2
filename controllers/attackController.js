const User = require('../models/User');

class AttackController {
  static randomSuccess(attackerSoldiers, defenderSoldiers) {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(Math.random() < attackerSoldiers / (defenderSoldiers + 1));
    }
    return arr.filter((el) => el).length >= 2 ? true : false;
  }

  static attack(req, res, next) {
    const defenderId = req.params.id;
    const attackerSoldiers = Number(req.body.soldiers);
    let attacker;
    let defender;
    let isSuccess;
    User.findById({ _id: req._userId })
      .then((user) => {
        if (user) {
          attacker = user;
          return User.findById({ _id: defenderId });
        } else {
          throw {name :'NOT_FOUND'};
        }
      })
      .then((user) => {
        if (user) {
          defender = user;
          if (attacker.resources.soldiers >= attackerSoldiers) {
            const resources = attacker.resources;
            resources.soldiers = attacker.resources.soldiers - attackerSoldiers;
            return true;
          } else {
            throw {name:'NOT_ENOUGH'};
          }
        } else {
          throw {name:'NOT_FOUND'};
        }
      })
      .then((user) => {
        isSuccess = AttackController.randomSuccess(
          attackerSoldiers,
          defender.resources.soldiers
        );
        if (isSuccess) {
          
          const newMedals = attacker.medals + 5;
          const resources = attacker.resources;
          resources.golds =
            resources.golds + Math.floor(defender.resources.golds / 2);
          resources.foods =
            resources.foods + Math.floor(defender.resources.foods / 2);
          resources.soldiers = attacker.soldiers - attackerSoldiers;
          return User.findOneAndUpdate(
            { _id: attacker._id },
            { medals: newMedals, resources }
          );
        } else {
          const newMedals = Math.floor(attacker.medals / 2);
          return User.findOneAndUpdate(
            { _id: attacker._id },
            { medals: newMedals }
          );
        }
      })
      .then((user) => {
        attacker = user;
        if (isSuccess) {
          const resources = defender.resources;
          resources.foods = Math.ceil(defender.resources.foods / 2);
          resources.golds = Math.ceil(defender.resources.golds / 2);
          resources.soldiers = 0;
          return User.findOneAndUpdate({ _id: defender._id }, { resources });
        } else {
          return User.findOneAndUpdate(
            { _id: defender._id },
            { medals: defender.medals + 2 }
          );
        }
      })
      .then((user) => {
        defender = user;
        res.status(200).json({
          success: true,
          message: `Attack ${isSuccess ? 'Success' : 'Fail'}`,
        });
      })
      .catch(next);
  }
}

module.exports = AttackController;
