const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/',  async (request, response) => {
  const blog = await Blog.find({}).populate('user', {username: 1, name: 1}) 
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  const user = await User.findById(blog.user)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

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