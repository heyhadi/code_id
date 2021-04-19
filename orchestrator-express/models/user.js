const Redis = require('ioredis')
const redis = new Redis({
    // This is the default value of `retryStrategy`
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  })
const axios = require('axios')

class User {

    static async register(input) {
        try {
            await redis.del('user:data')
            const user = await axios.post("http://localhost:4001/users/register", input)
            return user.data
            

        } catch (error) {
            return {error};
            
        }
    }

    static async login(input) {
        try {
            await redis.del('user:data')
            const user = await axios.post("http://localhost:4001/users/login", input)
            return user.data
            

        } catch (error) {
            return {error};
            
        }
    }

    static async getById(id) {
        try {
            const {data} = await axios.get(`http://localhost:4001/users/${id}`)
            const user = data
            redis.set('user:data', JSON.stringify(user))
            return user

        } catch (error) {
            return {error};
            
        }
    }

    static async update(id, input) {
        try {
            await redis.del('user:data')
            const {data} = await axios.put(`http://localhost:4001/users/${id}`, input)
            return data
            

        } catch (error) {
            return {error};
            
        }
    }


    static async delete(id) {
        try {
            await redis.del('user:data')
            const {data} = await axios.delete(`http://localhost:4001/users/${id}`)
            return data
            

        } catch (error) {
            return {error};
            
        }
    }
}

module.exports = User