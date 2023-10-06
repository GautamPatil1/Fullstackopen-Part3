const express = require('express')

var morgan = require('morgan')
const app = express()
app.use(express.static('dist'))
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(morgan('combined'))
app.use(cors())


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
  response.json(persons)
});

app.get('/info', (req, res) => {
    res.send('<p> Phonebook has info of '+ persons.length +' people </p>' +
    '<p>' + new Date() + '</p>'
    )
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    res.json(person)
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
});

app.post('/api/persons/', (req, res) => {
    const person = req.body
    person.id = Math.floor(Math.random() * 1000000) + 1
    if ( !person.name || !person.number ) {
        return res.status(400).json({ 
            error: 'content missing' 
        })
    }

    if ( persons.find(p => p.name === person.name ) ) {
        return res.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    persons.push(person)
    res.json(person)
    console.log(persons)

});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})