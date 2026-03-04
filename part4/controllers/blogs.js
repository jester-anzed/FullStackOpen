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

blogRouter.put('/:id', async (request, response) => {
  const likes = request.body.likes

  const id = await Blog.findById(request.params.id)

  id.likes = likes
  const updatedLikes = await id.save()
  response.status(200).json(updatedLikes)

})


module.exports = blogRouter