const {getDB} = require('../mongodb')
const { hashPassword } = require("../helpers/bcrypt");
// const usersDB = getDB().collection("users")

class User {
  static create(user) {
    user.password = hashPassword(user.password)
    return getDB().collection("users").insertOne(user)
  }

  static findByEmail(email) {
    return getDB().collection("users").findOne({email})
  }
}

module.exports = User