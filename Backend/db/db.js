const mongoose=require('mongoose');

function connnectToDb(){
    mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true, useUnifiedTopology:true},()=>{
         console.log('Connected to DB');
    });
}