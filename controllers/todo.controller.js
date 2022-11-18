const Todo = require("../models/todo");

module.exports = {
  getAllTodo: async (req, res) => {
    try {
      const todo = await Todo.find().populate("user", "name");
      
      res.json({
        message: "success get data",
        data: todo
      });
    } catch (err) {
      res.status(404).json({
        message: "not found",
        error: error.message,
      });
    }
  },

  getTodoByID: async (req, res) => {
    try {
      const todo = await Todo.findById({_id: req.params.id});;

      res.json({
        message: "success add",
        data: todo
      });
    } catch (err) {
      res.status(404).json({
        message: "not found",
        error: error.message,
      });
    }
  },

  addTodo: async (req, res) => {
    try {
      const auth = req.headers.authorization;
      const token = auth.split(" ")[1];

      const verified = jwt.verify(token, "secret");

      const todoolistuser = await Todoolistuser.create({
        title: req.body.title,
        content: req.body.content,
        user: verified.id,
      });

      await todoolistuser.save();

      res.status(201).json({
        message: "add todolistuser success",
        data: todoolistuser,
      });
    } catch (error) {
      res.status(404).json({
        message: "failed to create todolist",
        error: error.message,
      });
    }
  },

  deleteTodoByID: async (req, res) => {
    try {
      const auth = req.headers.authorization;
      const token = auth.split(" ")[1];

      const verified = jwt.verify(token, "secret");

      const todoolistuser = await Todoolistuser.findOneAndDelete({
        _id: req.params.id,
      });
      if (todoolistuser.user == verified.id) {
        res.status(200).json({
          message: "success data todoolistener",
          data: todoolistuser,
        });
      } else {
        res.status(401).json({
          message: "Unauthorized",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "failed delete todoolistuser",
        error: error.message,
      });
    }
  },

  updateTodoByID: async (req, res) => {
    try {
      const auth = req.headers.authorization;
      const token = auth.split(" ")[1];

      const verified = jwt.verify(token, "secret");

      const todoolistuser = await Todoolistuser.findOne({ _id: req.params.id });

      if (todoolistuser) {
        await Todoolistuser.updateOne({
          title: req.body.title,
          content: req.body.content,
          user: verified.id,
        });

        await todoolistuser.save();

        res.status(201).json({
          message: " data todoolistuser has been update ",
        });
      }
    } catch (error) {
      res.status(401).json({
        message: "todoolistuser cannot be updated",
      });
    }
  },
}