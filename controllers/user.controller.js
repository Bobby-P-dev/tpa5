const bcrypt = require('bcrypt');
const User = require("../models/user")
const jwt = require('jsonwebtoken');


module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({}, "-__v -password")

      res.json({
        message: "success get data user",
        data: users
      })
    } catch (error) {
      console.log(error);
    }
  },

  getUserByID: async (req, res) => {
    try {
      const users = await User.findById({ _id: req.params.id });

      res.json({
        message : "success",
        data: users,

      });
    } catch (error) {
      res.status(404).json({
        message: "not found",
        error: error.message,
      });
    }
    },

  addUser: (req, res) => {
    const data = req.body

    const saltRounds = 10
    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash

    const user = new User(data)

    // console.log(user)
    user.save()

    res.json({
      message: "data has been created!!",
    })
  },

  deleteUserByID: async (req, res) => {
    try {
      const users = await User.findOneAndDelete({ _id: req.params.id });

      res.status(201).json({
        data: users,
        message: "success delete",
      });
    } catch (error) {
      res.status(401).json({
        message: " failed delete",
        error: error.message,
      });
    }
  },

  updateUserByID: async (req, res) => {
    try {
      const data = req.body;
      const users = await User.findOne({ _id: req.params.id });

      if (users) {
        await User.updateOne({
          name: data.name,
          email: data.email,
          password: data.password,
        });

        await users.save();

        res.status(201).json({
          message: "user update",
        });
      }
    } catch (error) {
      res.status(401).json({
        message: " the user cannot be updated",
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const data = await req.body;
      const user = await User.findOne({ email: data.email });
      if (user) {
        const cekPassword = bcrypt.compareSync(data.password, user.password);

        if (cekPassword) {
          const token = jwt.sign(
            {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            "secret",
            { expiresIn: "1d" }
          );

          res.status(200).json({
            message: "success",
            token: token,
          });
        } else {
          res.status(401).json({
            message: "Invalid Email or Password",
          });
        }
      } else {
        res.status(401).json({
          message: "Invalid Email or Password",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "invalid login",
        error: error.message,
      });
    }
  },
};