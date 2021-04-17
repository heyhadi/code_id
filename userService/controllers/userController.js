const { comparePassword } = require("../helpers/bcrypt")
const User = require("../models/user")
const { generateToken } = require("../helpers/jwt")
const { json } = require("express")

class UserController {
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
      console.log(error.message);
      res.status(500).json(error.message)
    }
  }

  static async getByAccNumber (req, res, next){
      try {
        const { accountNumber } = req.params
        const user = await User.findByAccNo(accountNumber)
        delete user.password
        res.status(200).json(user)
          
      } catch (error) {
          next(error)
          
      }

  }

  static async getByIdNumber (req, res, next){
    try {
      const { identityNumber } = req.params
      const user = await User.findByIdNo(identityNumber)
      delete user.password
      res.status(200).json(user)
        
    } catch (error) {
        next(error)
        
    }

}

}

module.exports = UserController