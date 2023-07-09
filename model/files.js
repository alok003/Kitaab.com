const mongoose=require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/uploads/users/files');
const fileSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    likes:{
        type:Number
    },
    likesU:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    description:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    }
},{
    timestamps:true
});



let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'..',FILE_PATH))
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' +Date.now());
    }
});

fileSchema.statics.uploadedFile = multer({storage: storage}).single('file');
fileSchema.statics.filePath=FILE_PATH;


const File = mongoose.model('file',fileSchema);
module.exports = File;
