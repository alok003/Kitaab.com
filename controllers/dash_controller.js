const File = require('../model/files.js');
const User = require('../model/users.js');
const fs=require('fs');
const path=require('path');
module.exports.dashboard = async function(req,res){
    const user=req.user;
    const fileU=await File.find({user:user._id});
    if(user.editor == true)
        return res.render('dashboard',{files:fileU});
    else
        res.redirect('/');
}
module.exports.newfile =function(req,res){
    if(req.user.editor){
        File.uploadedFile(req,res,async function(err){
            if(err){
                console.log(`multer error :${err}`);
            }
            if(req.file&&req.file.mimetype=='application/pdf'&&req.file.size<5242880){

                const file = await File.create({
                    user:req.user._id,
                    title:req.body.title,
                    subject:req.body.subject,
                    likes:0,
                    description:req.body.description,
                    file:File.filePath+ '/' +req.file.filename
                });

                if(file){
                    const user=await User.findById(req.user.id);
                    user.fileContrib.push(file._id);
                    user.save();
                }
            }
        });
    }
    return res.redirect('/');
}
module.exports.updpwd=async function(req,res){
    if(req.body.password==req.body.passwordcnf){
        const user= await User.findById(req.user._id);
        user.password=req.body.password;
        user.save();
    }
    return res.redirect('dashboardView')
}
module.exports.delfile= async function(req,res){
    const fileid=req.params.id;
    const file=await File.findById(fileid);
    console.log('er0');
    if(file){
        const user=await User.findById(file.user);
        const fileIndex = user.fileContrib.indexOf(fileid);
        if (fileIndex > -1) {
            user.fileContrib.splice(fileIndex, 1);
        }
        user.save()
        fs.unlinkSync(path.join(__dirname,'..',file.file));
        await File.findByIdAndDelete(fileid);
    }
    return res.redirect('/doc/dashboard/dashboardView');
}