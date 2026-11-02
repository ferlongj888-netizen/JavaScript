import { type ChangeEventHandler, type ReactEventHandler } from "react";
import "../styles/NoteTag.css"

export default function NoteTag({
  text,
  change_handler,
  lost_focus_handler,
  color = "lightgreen",
  allow_edit = false,
}: {
  text: string;
  color?: string;
  allow_edit?: boolean;
  lost_focus_handler?: ReactEventHandler;
  change_handler?: ChangeEventHandler;
}) {
  return (
    <div style={{ backgroundColor: color }} className="note-tag-pill">
      {allow_edit ? (
        <input
          value={text}
          onBlur={lost_focus_handler}
          onChange={change_handler}
        ></input>
      ) : (
        text
      )}
    </div>
  );
}
