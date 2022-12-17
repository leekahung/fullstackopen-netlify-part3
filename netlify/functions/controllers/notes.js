const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (_request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    date: new Date().toISOString(),
    important: body.important,
  });

  const savedNote = await note.save();
  response.json(savedNote);
});

notesRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const updatedNote = await Note.findByIdAndUpdate(request.params.id, body, {
    new: true,
  });
  response.json(updatedNote);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = notesRouter;
