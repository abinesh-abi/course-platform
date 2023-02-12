const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    classes:{
      type:Array,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course", schema);
