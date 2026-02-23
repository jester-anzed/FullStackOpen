require('dotenv').config()

const express = require("express")
const app = express()
app.use(express.json())


app.use(express.static('dist'))


const morgan = require('morgan')


const Phone = require('./models/phonebook')



const requestMorgan = (tokens, request, response ) => {
  return [
  tokens.method(request, response),
  tokens.url(request, response),
  tokens.status(request, response),
  tokens.res(request, response, 'content-length'), '-',
  tokens['response-time'](request, response), 'ms',
  tokens.new(request, response)
  ].join(' ')
}

morgan.token('new', (request, response) => {
  const body = request.body
  return JSON.stringify(body)
})

app.use(morgan(requestMorgan))

// ID Generator
const generateId = () => {
  const id = Math.floor(Math.random() * 10000000)

  return String(persons.length + id)

}

//GET Request
app.get('/api/persons', (request, response) => {
  Phone.find({}).then(person => response.json(person))
})


//POST Request

app.post('/api/persons/', (request, response) => {
   const body = request.body

   Phone.findOne({ name: request.body.name }).then(person => {
      const exists = person !== null

    if (exists) {
      return response.status(400).json({ error: 'name already exists' })
    }

  })

   if (!body.name || !body.number) {
      return response.status(404).json({ error: "missing content" })
   }

   

})






app.get('/info', (request, response) => {
  const now = new Date();
  response.setHeader('Content-Type', 'text/html')
  response.write(`<p>Phonebook has info for ${persons.length} people</p>`)
  response.write(`<p>${now}</p>`)
  response.end()
})


app.get('/api/persons/:id', (request, response) => {
  
  const id = request.params.id 
  const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  console.log('working')
  const id = request.params.id
  persons = persons.filter(person => person.id !==id)

  response.status(204).end()

})





const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})




