const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const connection= async(req,res)=>{
    try{
        const conn = await mongoose.connect(
            process.env.MONGODB
            , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database connected!")
    }catch(err){
         console.log(err);
    }
}

module.exports=connection;