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

  static findById(id) {
    return getDB().collection("users").findOne(id)
  }

  static async update(id, user) {
    return getDB().collection('users').updateOne(id, { $set:user})
}

static async delete(id) {
  return getDB().collection('users').deleteOne(id)
}
}

module.exports = User