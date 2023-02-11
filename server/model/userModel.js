const { default: mongoose } = require("mongoose");


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
        type:mongoose.Types.ObjectId,
        ref: 'course',
        require:true
    },
    approved:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
})

module.exports = mongoose.model('user', schema)