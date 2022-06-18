const mongoose=require("mongoose")
const {Schema}=mongoose


const teacher=new Schema({

    firstName:{type:String,require:false},
    lastName:{type:String,require:false},
    dni:{type:Number,require:false},
    address:{type:String, require:false},
    country:{type:String, require:false},
    province:{type:String, require:false},
    username:{type:String, require:false},
    phone:{type:Number, require:false},
    status:{type:Boolean, require:false},
    materias:[{type:String}],
    password:{type:String,require:false}

})

module.exports=mongoose.model('Teacher',teacher)