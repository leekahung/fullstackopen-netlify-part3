const ShowNoteButton = ({ handleShowAll, showAll }) => {
  return (
    <div>
      <button onClick={handleShowAll}>
        show {showAll ? "important" : "all"}
      </button>
    </div>
  );
};

export default ShowNoteButton;
