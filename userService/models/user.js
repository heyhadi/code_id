const {getDB} = require('../mongodb')
const { hashPassword } = require("../helpers/bcrypt");
// const usersDB = getDB().collection("users")

class User {
  static create(user) {
    user.password = hashPassword(user.password)
    return getDB().collection("users").insertOne(user)
  }

  static findByEmail(emailAdress) {
    return getDB().collection("users").findOne({emailAdress})
  }

  static findByAccNo(accountNumber) {
    return getDB().collection("users").findOne({accountNumber})
  }

  static findByIdNo(idNumber) {
    return getDB().collection("users").findOne({idNumber})
  }
}

module.exports = User