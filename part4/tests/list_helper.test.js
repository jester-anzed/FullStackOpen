const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const blogs = require('./blog_helper')
const mongoose = require('mongoose')
const Blogs = require('../models/blog')

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

test.only('verify post request', async () => {

  const newBlog = {
    title: "PoE",
    author: "Jes",
    url: "Jes.poe.com",
    likes: 50
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, blogs.length + 1)

  const contents = response.body.map(cont => cont.title)

  assert(contents.includes("PoE"))

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
