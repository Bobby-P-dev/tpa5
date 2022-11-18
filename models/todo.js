const mongoose = require('mongoose');
const { Schema } = mongoose

const todoSchema = new Schema({
  name: String,
  isiTodo: String,
  user: {
    type: mongoose.ObjectId,
    ref: "User"
  }
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo