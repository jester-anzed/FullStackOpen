const express = require('express')
const mongoose = require('mongoose')

const app = express()

const blogSchema =  mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = `mongodb+srv://fullstackopen:test1234@cluster0.q9u15xv.mongodb.net/Blog?appName=Cluster0`
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    console.log(result)
    response.status(201).json(result)
  })
  .catch(error => {
    response.status(404).json({ error: "incorrect" })
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})