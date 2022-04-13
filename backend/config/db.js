const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        mongoose.connect('mongodb://localhost/chatapp')
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB