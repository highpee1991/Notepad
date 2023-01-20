import React from "react";
import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, handleUpdatedNote }) => {
  const onEditField = (key, value) => {
    handleUpdatedNote({
      ...activeNote,
      lastModifiedDate: Date.now(),
      [key]: value,
    });
  };

  return activeNote ? (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          autoFocus
          name="title"
          onChange={(e) => onEditField("title", e.target.value)}
          value={activeNote.title}
        />
        <textarea
          id="body"
          name="body"
          placeholder="Write your note here ..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  ) : (
    <div className="no-active-note">No Active Note Selected</div>
  );
};

export default Main;
