const mongoose = require('mongoose')

const connectDB = async ()=>{
    const DATABASE_URL = process.env.DATABASE_URL;
    try {
        mongoose.connect(DATABASE_URL)
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB