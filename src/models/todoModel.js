const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true},
    description: { type: String, required: true },
    status: { 
      type: String, 
      required: true,
      enum: ["complete", "incomplete"]
    },
  },
  { timestamps: true }
);

const ToDo = mongoose.model("ToDo", todoSchema);

module.exports = ToDo;