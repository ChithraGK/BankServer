//db connection
//import mongoose

const mongoose = require('mongoose')

//connection string

mongoose.connect('mongodb://localhost:27017/bankApp',{
    useNewUrlParser:true
})

//model definition(collection in mongo)

const User = mongoose.model('User', {
    acno: Number,
    username: String,
    password: String,
    balance: Number,
    transaction: [] 
})

module.exports={
    User
}