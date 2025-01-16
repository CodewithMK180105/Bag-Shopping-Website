const mongoose= require('mongoose');

mongoose.connect("mongodb://127.0.0.1:270107/BagsSellingWebsite");

const userSchema=mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
});

module.exports= mongoose.model('user', userSchema);