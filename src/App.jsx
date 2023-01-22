import { useEffect } from "react";
import { useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./component/Main";
import SideBar from "./component/SideBar";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [activeNote, setActiveNote] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWidtDimesion = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWidtDimesion);

    return () => {
      window.removeEventListener("resize", handleWidtDimesion);
    };
  }, [windowWidth]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNotes = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      lastModifiedDate: Date.now(),
      body: "",
    };

    setNotes([...notes, newNote]);
  };

  const handleDelete = (id) => {
    const deleted = notes.filter((noteToDelete) => noteToDelete.id !== id);
    setNotes(deleted);
  };

  const displayActiveNote = () =>
    notes.find((newNote) => newNote.id === activeNote);

  const handleUpdatedNote = (updating) => {
    const isactiveNoteUpdated = notes.map((note) => {
      if (note.id === activeNote) {
        return updating;
      }
      return note;
    });
    setNotes(isactiveNoteUpdated);
  };

  return (
    <div className="App">
      <SideBar
        notes={notes}
        handleAddNotes={handleAddNotes}
        handleDelete={handleDelete}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        windowWidth={windowWidth}
      />
      <Main
        activeNote={displayActiveNote()}
        handleUpdatedNote={handleUpdatedNote}
      />
    </div>
  );
}

export default App;
