const { default: mongoose } = require("mongoose");
const basicConfig = require("../config/basicConfig");


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    course:{
        type:String,
        require:true
    },
    avatar:{
        type: String,
        default: basicConfig.INITIAL_PROFIE
    },
},{
    timestamps:true
})

module.exports = mongoose.model('user', schema)