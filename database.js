
require('dotenv').config();
const mongoose =require('mongoose');
mongoose.connect(process.env.MONGO_LINK).then(()=>{console.log('database connected');}).catch(err=>{console.log(err);})

const schema =new mongoose.Schema({
    name:String,
    email:String,
    message:String,
    date:Date
});

const model =mongoose.model('collection',schema);
module.exports =model;