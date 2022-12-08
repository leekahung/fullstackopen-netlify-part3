const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const morgan = require("morgan");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-1-17T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2022-1-17T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-1-17T19:20:14.298Z",
    important: true,
  },
  {
    id: 4,
    content: "POST is used to add data to a REST api",
    date: "2022-1-17T19:24:12.029Z",
    important: false,
  },
  {
    id: 5,
    content: "Network tab of devtools is most beneficial",
    date: "2022-1-17T20:05:51.764Z",
    important: false,
  },
];

const app = express();
app.use(cors());
app.use(express.json());

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLog = ":method :url :status :res[content-length] - ms :body";
app.use(morgan(middlewareLog));

app.get("/api/data", (request, response) => {
  response.send(notes);
});

app.get("/api/data/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((n) => n.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.post("/api/data", (request, response) => {
  const note = request.body;
  notes = notes.concat(note);

  response.json(note);
});

app.put("/api/data/:id", (request, response) => {
  const id = Number(request.params.id);
  const updatedNote = request.body;
  notes = notes.map((n) => (n.id !== id ? n : updatedNote));

  response.json(updatedNote);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

module.exports.handler = serverless(app);
