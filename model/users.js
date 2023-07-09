const mongoose=require('mongoose');
const multer = require('multer');
const path = require('path');
const PROFILE_PATH = path.join('/uploads/users/avatars');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    editor:{
        type:Boolean
    },
    admin:{
        type:Boolean
    },
    college:{
        type:String
    },
    branch:{
        type:String
    },
    passing:{
        type:Number
    },
    avatar:{
        type:String
    },
    fileContrib:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'files'
    }],
    liked:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'files'

    }]

},{
    timestamps:true
});



let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'..',PROFILE_PATH))
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' +Date.now());
    }
});

userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath=PROFILE_PATH;


const User = mongoose.model('user',userSchema);
module.exports = User;
