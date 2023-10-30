import postModel from '../../models/post.js';
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
       }
     
     }
}
export default postsResolver