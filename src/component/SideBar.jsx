import React from "react";
import { FaTrash } from "react-icons/fa";

const SideBar = ({
  notes,
  handleAddNotes,
  handleDelete,
  activeNote,
  setActiveNote,
}) => {
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={handleAddNotes}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {notes
          .sort((a, b) => b.lastModifiedDate - a.lastModifiedDate)
          .map((note) => (
            <div
              className={`app-sidebar-note ${
                activeNote === note.id && "active"
              }`}
              key={note.id}
              onClick={() => setActiveNote(note.id)}
            >
              <div className="sidebar-note-title">
                <strong>{note.title}</strong>
                <button onClick={() => handleDelete(note.id)}>
                  <FaTrash />
                </button>
              </div>

              <p>{note.body && note.body.substr(0, 100) + "..."}</p>
              <small className="note-meta">
                last Modified:{" "}
                {new Date(note.lastModifiedDate).toLocaleDateString("en-UK", {
                  hour: "2-digit",
                  minute: "2-digit",
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </small>
            </div>
          ))}
      </div>
      ;
    </div>
  );
};

export default SideBar;
