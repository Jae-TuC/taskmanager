const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],  
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
    },
    password: { 
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password must be at least 6 characters long"],
    }
})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
