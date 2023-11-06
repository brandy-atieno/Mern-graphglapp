import postModel from '../../models/post.js';
import { auth } from '../../util/auth.js';
const postsResolver={

    Query :{
        async getPosts(){
         try{
         const posts= await postModel.find()
         return posts
         }
         catch(err){
         throw new Error(err)
         }
       },
     async getPost(_,{postId}){
      try{
        const post = await postModel.findById(postId)
        if(post){
return post
        }
        else{
          throw new Error('Post not found')
        }

     }
     catch(err){
      throw new Error(err)
     }
     }
     
},
Mutation: {
          
async createPost(_,{ body },context){
const user = auth(context);
console.log(user);
const newPost = await postModel({
  body,
  user:user.id,
  username:user.username
})
const post = await newPost.save()
 return post       }
}}
export default postsResolver