const { comparePassword } = require("../helpers/bcrypt")
const User = require("../models/user")
const { generateToken } = require("../helpers/jwt")
// const { json } = require("express")
const { ObjectId } = require('mongodb');


class UserController {

  // REGISTER
  static async register (req, res, next) {
    try {
        const { userName, emailAdress, password, accountNumber, identityNumber } = req.body
        const user = await User.findByEmail(emailAdress)
  
        if (user) {
          return next({name: 'EMAIL_ALREADY_USED'})
        } else {
          const newUser = await User.create({ userName, emailAdress, password, accountNumber, identityNumber })
        
          res.status(201).json("your registration is successfull")
        }
      } catch (error) {
        next(error)
      }
    }

//LOGIN

  static async login (req, res, next) {
    try {
      const { emailAdress, password } = req.body
    //   console.log(req.body);
      const user = await User.findByEmail(emailAdress)
      // console.log(user);

      if (!user) {
        return next({name: 'WRONG_LOGIN'})
      } 
      const isValidPass = comparePassword(password, user.password)
      if (!isValidPass) {
        return next({name: 'WRONG_LOGIN'})
      } else {
        const payload = {
          _id: user._id,
          emailAdress: user.emailAdress,
          userName: user.userName
        }
        const access_token = generateToken(payload)
        res.status(200).json({access_token})
      }

    } catch (error) {
      // console.log(error.message);
      res.status(500).json(error.message)
    }
  }

//GET USER BY ID

  static async getById (req, res, next){
    try {
      const { id } = req.params
      const filter = { _id: ObjectId(id) };
      const user = await User.findById(filter)
      delete user.password
      res.status(200).json(user)
        
    } catch (error) {
        next(error)
        
    }

}

// UPDATE USER DATA

static async update(req, res, next) {
  try {
    const { id } = req.params;
    const filter = { _id: ObjectId(id) };
    const data = await User.update(filter, req.body);
    if (data.result.n === 0) {
      throw { message: "data not found" };
    }
    res
      .status(200)
      .json({ message: `${data.result.n} data has been updated` });
  } catch (error) {
    next (error)
  }
}

//DELETE DATA 
static async delete(req, res) {
  try {
    const { id } = req.params;
    const filter = { _id: ObjectId(id) };
    const data = await User.delete(filter);
    if (data.result.n === 0) {
      throw { message: "data not found" };
    }
    res
      .status(200)
      .json({ message: `${data.result.n} data has been deleted` });
  } catch (error) {
    res.status(404).json(error);
  }
}

}

module.exports = UserController