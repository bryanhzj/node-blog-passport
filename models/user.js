const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema


const userSchema = new Schema({
    // firstName: {
    //     type: String,
    //     required: true
    // },
    // lastName: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
})

userSchema.pre("save", async function(next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        console.log(this)
        next()
    } catch {
        throw new Error('Error hashing password')
    }
})

// userSchema.methods.setPassword = async function(password) {
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10)
//         this.password = hashedPassword
//         console.log(this)
//         return hashedPassword
//     } catch {
//         throw new Error('Error hashing password')
//     }
// }

userSchema.methods.validatePassword = async function(password) {
    try {
        const hash = await bcrypt.hash(password, 10)
        return this.password === hash
    } catch {
        throw new Error('error compare password')
    }
}

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}
  
userSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

const User = mongoose.model('user', userSchema)

module.exports = User