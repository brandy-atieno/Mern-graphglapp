import  { GraphQLError }  from 'graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../../models/user.js';
import {validators} from '../../util/validator.js';
import {loginValidator } from '../../util/validator.js';
const generateToken = (user)=>{
    jwt.sign({
    id:user.id,
    username:user.username,
    email:user.email
},process.env.SECRET_KEY,{expiresIn:'1h'})
}
const usersResolver = {
    Mutation:{
    async login (_,{username,password}) {
        const {errors,valid} = loginValidator(username,password)
        if(!valid){
              throw new GraphQLError('Errors',
            {
                extensions:{
                error:errors}
            })
        }
        const user = await userModel.findOne({ username}) 
        if(!user){
        errors.general = 'User not found'
        throw new GraphQLError('Errors',
            {
                extensions:{
                error:errors}
            })}
            const comparePassword = await bcrypt.compare(password,user.password)
            if(!comparePassword){
        errors.general = 'Invalid credentials'
        throw new GraphQLError('Errors',
            {
                extensions:{
                error:errors}
            })}
            const token = generateToken(user)
            return{
                ...user._doc,
id:user._id,
token            }
       
    },
    async register(_,{registerInput:{username,email,password,confirmPassword}}){
        //Validate user

        const {valid,errors} = validators(username,email,password,confirmPassword)
        if(!valid){
            throw new GraphQLError('Errors',
            {
                extensions:{
                error:errors}
            })
        }

        //CHECK USERNAME EXISTS

        const checkUsernameExists= await userModel.findOne({username})
        if(checkUsernameExists){
        throw new GraphQLError('Username is taken',{
            extensions: {
            username:'This username is taken'
        }
    }
    )}
password = await bcrypt.hash(password,20);
const user = new userModel({
    username,
    email,
    password
    
})
const res = await user.save();
const token = generateToken(res)
return{
    ...res._doc,
    id:res.id,
    token
}
        }

      
    }
}
    
export default usersResolver