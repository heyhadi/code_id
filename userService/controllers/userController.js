const { comparePassword } = require("../helpers/bcrypt")
const User = require("../models/user")
const { generateToken } = require("../helpers/jwt")

class UserController {
  static async register (req, res, next) {
    try {
        const { userName, emailAdress, password, identityNumber } = req.body
        const user = await User.findByEmail(emailAdress)
  
        if (user) {
          return next({name: 'EMAIL_ALREADY_USED'})
        } else {
          const newUser = await User.create({ userName, emailAdress, password, identityNumber })
        
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
      console.log(user);

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

//   static async get (req, res, next){
//       try {
//         const { emailAdress } = req.body
//         const user = await User.findByEmail({emailAdress})
//         res.status(200).json(user)
          
//       } catch (error) {
//           res.status(500).json(error.message)
          
//       }

//   }
}

module.exports = UserController