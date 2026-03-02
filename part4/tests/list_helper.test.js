const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs = require('./blog_helper')

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