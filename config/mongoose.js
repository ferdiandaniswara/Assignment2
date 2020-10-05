const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    'mongodb://localhost/assignment2',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = mongoose.connection;
  db.on('error', (e) => console.log(e));
  db.once('open', () => console.log('Mongoose connection success!'));
};
