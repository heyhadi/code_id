const User = require('../models/user')
const Redis = require('ioredis')
const redis = new Redis({
    // This is the default value of `retryStrategy`
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  })

class UserController {

    static async register(req, res) {
        try {
            
            const user = await User.register(req.body)

            res.status(201).json(user)
            
        } catch (error) {
            res.status(500).json(error)
            
        }

    }

    static async login(req, res) {
        try {
            
            const user = await User.login(req.body)

            res.status(201).json(user)
            
        } catch (error) {
            res.status(500).json(error)
            
        }

    }

    static async getById(req, res) {
        const {id} = req.params
        try {
            const userData = await redis.get('user:data')
            if (userData) {
                console.log('data from redis');
                res.status(200).json(JSON.parse(userData))
            } else {
                console.log('from server');
                const user = await User.getById(id)

                res.status(200).json(user)
            }
            
        } catch (error) {
            res.status(500).json(error.message)
            
        }
    }

    static async update(req, res) {
        try {
            const {id} = req.params
            const user = await User.update(id, req.body)
            if (user.error) {
                res.status(404).json('data not found')
            }
            res.status(200).json(user)
            
        } catch (error) {
            res.status(500).json(error)
            
        }

    }

    static async delete(req, res) {
        try {
            const {id} = req.params
            const user = await User.delete(id)
            if (user.error) {
                res.status(404).json('data not found')
            }
            res.status(200).json(user)
            
        } catch (error) {
            res.status(500).json(error.message)
            
        }

    }
}

module.exports = UserController