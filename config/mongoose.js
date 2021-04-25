const mongoose=require('mongoose');
const { connect } = require('../routes');
mongoose.connect('mongodb://localhost/test');

const db=mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('successfully connected to database');

});


