const {test, beforeEach, after, describe}  = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const userHelper = require('../models/user')
const dummyUser = require('./user_helper')


const api = supertest(app)

beforeEach(async () => {
    await userHelper.deleteMany({})
    await userHelper.insertMany(dummyUser)
})

describe('User Validation', () => {
    test.only('Min Length User', async ()=> {


    
        const newUser = {
            username: "Ma",
            name: "Jester",
            password: "test1234"
        }

        const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        const userLength = await api.get('/api/users')

       assert.strictEqual(userLength.body.length, userHelper.length)
       assert.strictEqual(response.status, 400)

    })


})





after(async () => {
  await mongoose.connection.close()
})
