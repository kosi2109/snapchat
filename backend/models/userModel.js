const mongoose  = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    email :{
        type : String,
        unique: true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    fullName : {
        type : String,
        required : true
    },
    pic : {
        type : String,
        default : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
    }
},{timestamps : true})


userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }

    const genSalt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,genSalt)
})

const User = mongoose.model('User',userSchema)

module.exports = User

