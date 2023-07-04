const Admin = require('../model/admin.js');
module.exports.home = function(req,res){
    return res.render('home');
}
module.exports.about = function(req,res){
    return res.render('about');
}
module.exports.adminLog= function(req,res){
    return res.redirect('admin');
}
module.exports.adminLogP= function(req,res){
    return res.render('admin');
}
module.exports.sign_out= function(req,res){
    req.logout(function(err){
        if(err){
            console.log('error logging out');
        }
        else{
            return res.redirect('/');
        }
    });
}
module.exports.Nadmin = async function(req,res){
    const admin= await Admin.findOne({username:req.body.username});
    if(!admin){
        console.log(req.body);
        const cAdmin=await Admin.create(req.body);

    }
    return res.redirect('back');
}
module.exports.Uadmin = async function(req,res){
    const admin= await Admin.findOne({username:req.body.username});
    if(admin){
        admin.username=req.body.username;
        admin.password=req.body.password;
        admin.save();
        return res.redirect('back');
    }
    return res.redirect('/');
}