const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    'mongodb://localhost/assignment2',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
    }
  );

  const db = mongoose.connection;
  db.on('error', (e) => next({ name: 'MONGOOSE_ERROR' }));
  db.once('open', () => console.log('Connected to Database'));
  
};
