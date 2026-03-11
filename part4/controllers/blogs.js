const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogRouter.get('/',  async (request, response) => {
  
  const blog = await Blog.find({}).populate('user', {username: 1, name: 1}) 
  response.json(blog)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  
  const user = request.user

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

blogRouter.delete('/:id', userExtractor, async (request, response) => {

  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(404).json({ error: "Invalid Token or User" })
  }

})

blogRouter.put('/:id', async (request, response) => {
  const likes = request.body.likes

  const id = await Blog.findById(request.params.id)

  id.likes = likes
  const updatedLikes = await id.save()
  response.status(200).json(updatedLikes)

})


module.exports = blogRouter