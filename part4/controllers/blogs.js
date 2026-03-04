const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/',  async (request, response) => {
  const blog = await Blog.find({})
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  if (blog.title && blog.url) {
    const savedBlog = await blog.save()
    return response.status(201).json(savedBlog)
  } else {
    return response.status(400).end()
  }

})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})


module.exports = blogRouter