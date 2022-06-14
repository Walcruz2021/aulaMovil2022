const mongoose=require("mongoose")
const {Schema}=mongoose


const materia=new Schema({
    registro:{type:String,require:true},
    name:{type:String,require:true},
    //campo (materia) puede pertener a tecnologia,idioma,etc
    campo:{type:String,require:true},
    //nota:{type:Number,require:true},
    teachers:[{
        type:Schema.Types.ObjectId,
        ref:'Teacher',
        firstName:String
    }]
})

module.exports=mongoose.model('Materia',materia)