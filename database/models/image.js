const mongoose=require("mongoose")
const {Schema}=require("mongoose")

const image=new Schema({

imagen:{
    data:Buffer,
    contentType:String
},
student:{
    type:Schema.Types.ObjectId,
    ref:"Students"
}


})

module.exports=mongoose.model("Image",image)