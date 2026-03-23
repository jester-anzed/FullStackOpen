const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const blogs = require('./blog_helper')
const mongoose = require('mongoose')
const Blogs = require('../models/blog')
const User = require('../models/user')
const dummyUser = require('./user_helper')
const jwt = require('jsonwebtoken')
const { filter } = require('lodash')

const api = supertest(app)








beforeEach(async () => {

  await Blogs.deleteMany({})
  await Blogs.insertMany(blogs)

})

test('returns the correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.equal(response.body.length, 6)
})


test('verify unique identifier property', async () => {

  const response = await api.get('/api/blogs')

  const firstBlog = response.body[0]

  assert.ok(firstBlog.id)
  assert.strictEqual(firstBlog._id, undefined)

})

test('verify post request', async () => {

  const newUser = { 
    username: "Jizter",
    password: "test123456"
  }

  await api.post('/api/users').send(newUser)
  

  const login = await api.post('/api/login').send(newUser)
  const token = login.body.token

  const newBlog = {
    title: "PoE",
    author: "Jes",
    url: "Jes.poe.com",
    likes: 50
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, blogs.length + 1)

  const contents = response.body.map(cont => cont.title)

  assert(contents.includes("PoE"))

})

test('verify likes', async () => {

  const newUser = { 
    username: "Jizter",
    password: "test123456"
  }

  await api.post('/api/users').send(newUser)
  
  const login = await api.post('/api/login').send(newUser)
  const token = login.body.token



  const newBlog = {
    title: "Workout",
    author: "Marc",
    url: "www.marc.com",
  }


  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(response.body.likes, 0)

})


test('missing data', async () => {

  const newBlog = {
    author: "Mac",
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, blogs.length)

  
})

describe('deleting data', () => {
  test.only('deleted data', async () => {
    
    
    const newUser = { 
      username: "Jizter",
      password: "test123456"
    }

    await api.post('/api/users').send(newUser)
    
    const login = await api.post('/api/login').send(newUser)
    const token = login.body.token

    
    const newBlog = {
      title: "testing1",
      author: "testing",
      url: "www.testing.com",
      likes: 25

    }

    await api
    .post('/api/blogs/')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect('Content-Type', /application\/json/)

    const user = await api.get('/api/users')
    
    const blogs = await api.get('/api/blogs')

    const addedBlog = blogs.body.find(blog => blog.title === "testing1")

    await api
    .delete(`/api/blogs/${addedBlog.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

    const afterDelete = await api.get('/api/blogs')

    console.log(afterDelete.length)


  })

})

describe('updating data', () => {
  test('update likes data', async () => {
    
    const blogId = blogs[0]._id

    await api
      .put(`/api/blogs/${blogId}`)
      .send({ likes: 5})
      .expect(200)

    
    const response = await api.get('/api/blogs')

    const updatedLikes = response.body.find(blog => blog.id === blogId)
 
    assert.strictEqual(updatedLikes.likes, 5)
   
  })

})

describe('Token Authentication', () => {
  test("Test with token", async () => {

    
    const newUser = { 
      username: "Jizter",
      password: "test123456"
    }

    await api.post('/api/users').send(newUser)



      const login = await api.post('/api/login').send(newUser)
      const token = login.body.token

      const newBlog = {
        title: "Done Part 4",
        author: "Jes",
        url: "Done4theday.com",
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)

      const updatedBlog = await api.get('/api/blogs')

      const content = updatedBlog.body.map(blog => blog.title)

      assert(content.includes("Done Part 4"))

      assert.strictEqual(updatedBlog.body.length, blogs.length + 1)

      
  })
  test("Test without token", async () => {
    
    const newBlog = {
        title: "Create Doto",
        author: "Life",
        url: "Life4theday.com",
        likes: 12,
      }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, blogs.length)


  })



})


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const noBlogs = [] 

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(noBlogs)
    assert.strictEqual(result, 0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favorite blog', ()  => {

    test('favorite blog', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, 12)

    })

})

describe('most blogs', () => {

    test('most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, {author: 'Robert C. Martin', blogs: 3})

    })
})

describe('most likes', () => {
  test('most likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', likes: 12})
  })

})





after(async () => {
  await mongoose.connection.close()
})
