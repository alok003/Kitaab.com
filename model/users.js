const mongoose=require('mongoose');

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
    branch:{
        type:String
    },
    passing:{
        type:Number
    },
    avatar:{
        type:String
    },
    files:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'files'
    }]

},{
    timestamps:true
});

const User = mongoose.model('user',userSchema);
module.exports = User;
