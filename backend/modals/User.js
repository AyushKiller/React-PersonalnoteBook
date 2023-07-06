const mongoose=require('mongoose');
const{Schema}=mongoose;
const UserScema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        validate(value){
            if(!value.match(/\d/)||!value.match(
                /[a-zA-Z]/)){
                    throw new Error("password must contian atleast one letter and one number"
                    );
                }
                else if(value.length<6){
                    throw new Error("Minimum length is 6 charecter"
                    );
                }
        },
        required:true,
        unique:true
    },
    date:{
        type:Date,
        default:Date.now
    },
});
module.exports=mongoose.model('user',UserScema)