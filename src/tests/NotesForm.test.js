import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NotesForm from "../components/NotesForm";
import userEvent from "@testing-library/user-event";

test("<NotesForm /> updates parent state and calls onSubmit", async () => {
  const handleAddNote = jest.fn();
  const user = userEvent.setup();

  render(<NotesForm handleAddNote={handleAddNote} />);

  const input = screen.getByPlaceholderText("write note content here");
  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(handleAddNote.mock.calls).toHaveLength(1);
  expect(handleAddNote.mock.calls[0][0].content).toBe("testing a form...");
});
