import React, { useState } from "react";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const SideBar = ({
  notes,
  handleAddNotes,
  handleDelete,
  activeNote,
  setActiveNote,
  windowWidth,
}) => {
  const isBody = (bodyNote) => {
    let bodyText;
    if (windowWidth < 579) {
      bodyText = bodyNote.substr(0, 5) + "...";
    } else if (windowWidth === 580 || windowWidth < 780) {
      bodyText = bodyNote.substr(0, 12) + "...";
    } else {
      bodyText = bodyNote.substr(0, 20) + "...";
    }
    return bodyText;
  };

  return (
    <div className="app-sidebar">
      <div
        className={`app-sidebar-header ${
          windowWidth < 420 && "make-padding-column"
        }`}
      >
        <h1 className={`${windowWidth < 780 && "reduce-note"}`}>Notes</h1>
        <button
          onClick={handleAddNotes}
          className={`${windowWidth < 780 && "reduce-note"}`}
        >
          Add
        </button>
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
                <strong
                  className={`${windowWidth < 780 && "side-bar-title-shrink"}`}
                >
                  {windowWidth > 579
                    ? isBody(note.title).replace("...", "")
                    : isBody(note.title)}
                </strong>

                <button onClick={() => handleDelete(note.id)}>
                  <FaTrash />
                </button>
              </div>

              {note.body && <p>{isBody(note.body)}</p>}
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
