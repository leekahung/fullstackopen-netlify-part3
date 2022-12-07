const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

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

// setting up Express app with CORS
const app = express();
app.use(cors());

// setting up middleware
morgan.token("body", (request) => JSON.stringify(request.body));
middlewareLog = ":method :url :status :res[content-length] - ms :body";

app.use(express.json());
app.use(morgan(middlewareLog));

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((n) => n.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  const note = {
    id: body.id,
    content: body.content,
    date: body.date,
    important: body.important,
  };

  notes = notes.concat(note);

  response.json(note);
});

app.put("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;

  const updatedNote = {
    ...body,
    important: body.important,
  };

  notes = notes.map(n => n.id !== id ? n : updatedNote)

  response.json(updatedNote);
});

// run server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
