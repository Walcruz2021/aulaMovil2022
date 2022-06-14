const mongoose=require("mongoose")
const {Schema}=mongoose


const teacher=new Schema({
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    dni:{type:Number,require:true},
    address:{type:String, require:true},
    country:{type:String, require:true},
    province:{type:String, require:true},
    email:{type:String, require:true},
    phone:{type:Number, require:true},
    status:{type:Boolean, require:true},
    materias:[{type:String}]
})

module.exports=mongoose.model('Teacher',teacher)