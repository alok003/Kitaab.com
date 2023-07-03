const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://KitaabComADM:Hf23kJblkancwxPZ@cluster0.pitwm0u.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting DB'));

db.once('open',function(){
    console.log('connected to database ::mongoDB');
});

module.exports = db;
