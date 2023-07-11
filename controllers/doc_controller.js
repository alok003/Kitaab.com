const User = require('../model/users.js');
const File = require('../model/files.js');
const fs = require('fs');
const path=require('path');


module.exports.view = async function(req,res){
    const file=await File.find({});
    return res.render('view',{file:file});
}
module.exports.Cuser = async function(req,res){
    if(req.body.password!=req.body.confirmpassword){
        return res.redirect('/')
    }
    const user= await User.findOne({email:req.body.email});
    if(!user){
        const cUser=await User.create({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name,
            editor:false,
            admin:false
        });
    }
    return res.redirect('/');
}
module.exports.Csession = function(req,res){
    return res.redirect('/');
}
module.exports.sign_out = function(req,res){
    req.logout(function(err){
        if(err){
            console.log('error logiing out');
        }else{
            return res.redirect('/');
        }
    });   
}
module.exports.update =async function(req,res){
    const user= await User.findOne({email:req.user.email});
    User.uploadedAvatar(req,res,function(err){
        if(err){
            console.log(`multer error ${err}`);
        }
        user.editor=true;
        user.branch=req.body.branch;
        user.college=req.body.college;
        user.passing=req.body.passing;
        if(req.file&&(req.file.mimetype=='image/jpeg'||req.file.mimetype=='image/png')){
            if(user.avatar){
                fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }
            user.avatar=User.avatarPath+ '/' +req.file.filename;
        }
        user.save();
    });
    return res.redirect('dashboard/dashboardView');

}
module.exports.likeF=async function(req,res){
    const fileid=req.params.id;
    const file=await File.findById(fileid);
    if(!file.likesU.includes(req.user.id)){
        file.likes++;
        file.likesU.push(req.user.id);
        file.save();
    }
    return res.redirect('back')
}