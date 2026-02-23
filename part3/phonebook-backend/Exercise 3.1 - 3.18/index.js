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

//GET Request
app.get('/api/persons', (request, response) => {
  Phone.find({}).then(person => response.json(person))
})


//POST Request
app.post('/api/persons/', (request, response) => {
   const body = request.body

  if (!body.name || !body.number) {
      return response.status(404).json({ error: "missing content" })
   }

  const newContact = new Phone({
    name: body.name,
    number: body.number,
   })

  return newContact.save().then(data => response.json(data))


})

//Info Request  
app.get('/info', async (request, response) => {
  const now = new Date();
  const total = await Phone.countDocuments()

  response.setHeader('Content-Type', 'text/html')
  response.write(`<p>Phonebook has info for ${total} people</p>`)
  response.write(`<p>${now}</p>`)
  response.end()
})


//Request using ID
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id 

 Phone.findById(id).then(person => { 
    if (person) {
      console.log("Found")
      response.json(person)
    } else {
      response.status(404).json({ error: "Incorrect Id" })
    }
  }).catch(error => next(error))

})

//Delete Request
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  
   Phone.findByIdAndDelete(id).then(result => {
    if (result) {
      console.log("Deleted")
      response.status(204).end()
    } else {
      console.log("Incorrect ID")
      response.status(404).json({ error: "Invalid Id" })
    }
    })
    .catch(error => next(error))
})

//Update request
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Phone.findById(request.params.id).then(person => {
    if (!person) {
      return response.status(404).json({ error: "Invalid Id" })
    }

    person.name = name
    person.number = number

    return person.save().then(data => response.json(data))
  })
  .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})




