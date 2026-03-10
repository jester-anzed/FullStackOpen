const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if( authorization && authorization.startsWith('Bearer')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/',  async (request, response) => {
  const blog = await Blog.find({}).populate('user', {username: 1, name: 1}) 
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const decodeToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodeToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  }

  const user = await User.findById(decodeToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    ...request.body,
    user: user._id 
})

  if (blog.title && blog.url) {

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()
    return response.status(201).json(savedBlog)
  } 

})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

blogRouter.put('/:id', async (request, response) => {
  const likes = request.body.likes

  const id = await Blog.findById(request.params.id)

  id.likes = likes
  const updatedLikes = await id.save()
  response.status(200).json(updatedLikes)

})


module.exports = blogRouter