const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    description:{
      type:String
    },
    date:{
      type:Date
    },
    users:{
      type:mongoose.Types.ObjectId,
      ref:'user'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("class", schema);