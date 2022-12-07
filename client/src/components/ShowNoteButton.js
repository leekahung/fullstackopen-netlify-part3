const ShowNoteButton = ({ handleShowAll, showAll }) => {
  return (
    <button onClick={handleShowAll}>
      show {showAll ? "important" : "all"}
    </button>
  );
};

export default ShowNoteButton;
