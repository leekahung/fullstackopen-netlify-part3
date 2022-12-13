const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const morgan = require("morgan");
const Note = require("../../models/note");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/data", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/data/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
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

app.delete("/api/data/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLog = ":method :url :status :res[content-length] - ms :body";
app.use(morgan(middlewareLog));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CaseError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
