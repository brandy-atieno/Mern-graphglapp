import mongoose from 'mongoose';
const postSchema=  new mongoose.Schema({
description:String,
username:String,
comments:[
    {
        description:String,
        username:String
    }
],
likes:[{
    username:String
}],
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
},{timestamps:true})
export default mongoose.model('Post',postSchema)