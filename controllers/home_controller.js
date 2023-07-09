const User = require('../model/users.js');
module.exports.home = function(req,res){
    return res.render('home');
}
module.exports.about = function(req,res){
    // return res.download('./book.pdf') 
    return res.render('about');
}

