const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const morgan = require("morgan");
const Note = require("../../models/note");

const app = express();
app.use(cors());
app.use(express.json());

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLog = ":method :url :status :res[content-length] - ms :body";
app.use(morgan(middlewareLog));

app.get("/api/data", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/data/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

app.post("/api/data", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(404).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.put("/api/data/:id", (request, response) => {
  const body = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { important: body.important },
    { new: true }
  ).then((updatedNote) => {
    response.json(updatedNote);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
