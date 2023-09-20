
const express = require("express");
const app = express();
const morgan = require('morgan')
const cors = require('cors')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('-----')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
 
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('build'))
app.use(cors())

morgan.token('body', (req,res) =>  req.method === 'POST' ? JSON.stringify(req.body) : "")
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
   
  ].join(' ')
}))

 
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
 
app.use(requestLogger)
 
 
 
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const personLength = persons.length;
  res.send(
    `<p>Phonebook has info for ${personLength}  people</p>  <p>${new Date()} </p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => id === person.id )
  
  if (person) res.json(person);
  else {
    res.status(404).end();
  }
});

const generateId = () => Math.floor(Math.random() * 10000000 +1)
 

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const person = {
    number: body.number,
   id:  generateId(),
    name: body.name,
  }
 if (!body.name || !body.number) {
    return res.status(400).json({
      error: "the name or number is missing",
    })
  }
  const foundPerson = persons.find(person => person.name === body.name)
  if(foundPerson) {
    return res.status(400).json({
      error: 'name must be unique'
    })
    
  }  
   
  
  
 persons = persons.concat(person)
   res.json(person)
    
  
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.use(unknownEndpoint);
 

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


 