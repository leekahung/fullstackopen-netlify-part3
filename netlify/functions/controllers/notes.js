const notesRouter = require("express").Router();
const Note = require("../models/note");
const { userExtractor } = require("../utils/middleware");

notesRouter.get("/", async (_request, response) => {
  const notes = await Note.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const note = new Note({
    content: body.content,
    date: new Date().toISOString(),
    important: body.important,
    user: user._id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.json(savedNote);
});

notesRouter.put("/:id", userExtractor, async (request, response) => {
  const body = request.body;
  const noteToUpdate = await Note.findById(request.params.id);
  const user = request.user;

  if (user.username === "root") {
    const updatedNote = await Note.findByIdAndUpdate(
      request.params.id,
      { important: body.important },
      { new: true }
    );
    response.json(updatedNote);
  } else {
    if (user._id.toString() === noteToUpdate.user.toString()) {
      const updatedNote = await Note.findByIdAndUpdate(
        request.params.id,
        { important: body.important },
        { new: true }
      );
      response.json(updatedNote);
    } else {
      response.status(401).json({
        error: "Only original user can modify note.",
      });
    }
  }
});

notesRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const noteToDelete = await Note.findById(request.params.id);
  if (user.username === "root") {
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    if (user._id.toString() === noteToDelete.user.toString()) {
      await Note.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).json({
        error: "Only original user can delete note.",
      });
    }
  }
});

module.exports = notesRouter;
