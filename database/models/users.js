//libreria que nos permitira conectarse a mongodb
const mongoose=require('mongoose')
const {Schema}=mongoose;


const turnoSchema=new Schema({
    name:{type:String,require:true}
});

module.exports=mongoose.model('User',turnoSchema);
