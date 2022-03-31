const { response } = require("express");
const express = require("express");
const app = express();

app.use(express.json());
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

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  let ts = new Date();
  console.log(ts);
  console.log(persons.length);
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${ts}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.send(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (
    !person.name ||
    !person.number ||
    persons.map((p) => p.name).includes(person.name)
  ) {
    return response.status(400).json({ error: "name must be unique" });
  }
  const id = Math.floor(Math.random() * 1001);
  person.id = id;
  persons = persons.concat(person);
  response.json(person);

  // handle duplicate names
  {
    error: "name must be unique";
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on port.. ${PORT}`);
});
