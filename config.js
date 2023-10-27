import mongoose from 'mongoose';
const dbConnection =  async ()=>{
    try{
const connect = await mongoose.connect(process.env.CONNECTION_URI)
console.log('Db Connected',connect.connection.host,connect.connection.name)
}
catch(err){
    console.log(err)
}
}
export default dbConnection