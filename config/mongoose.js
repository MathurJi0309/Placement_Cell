const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/placement_devlopment');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Eror coneting to mongoDb"));



db.once('open',function(){
    console.log('connected to Databse sucessfully : MongoDb');

    module.exports=db;
})