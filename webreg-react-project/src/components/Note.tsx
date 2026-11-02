import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import type { NoteResponse } from "../types/note";
import NoteTag from "./NoteTag";
import { useNoteStore } from "../stores/noteStore";

export default function Note(note: NoteResponse) {
  const navigate = useNavigate();
  const deleteNote = useNoteStore((state) => state.delete);

  const handleDelete = async (ev: React.MouseEvent) => {
    ev.stopPropagation();
    if (!confirm("Вы уверены, что хотите удалить эту заметку?")) return;

    const result = await deleteNote(note.id);
  if (!result.success) {
    alert("Не удалось удалить заметку");
    }
  };

  const handleOpenComments = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    navigate(`/note/comment/${note.id}`);
  };

  return (
    <div
      className="note-card"
      onClick={() => navigate(`/note/detail/${note.id}`)}
    >
      <div className="note-title">{note.title}</div>
      <div className="note-content">{note.content}</div>

      <div className="note-tags-row">
        {note.tags.map((tag, index) => (
          <NoteTag key={`${note.id}-${index}`} text={tag} />
        ))}
      </div>

      <div className="note-author">Автор: {note.author}</div>

      <div className="note-actions">
        <button
          type="button"
          className="note-btn note-btn-comment"
          onClick={handleOpenComments}
        >
          <FontAwesomeIcon icon={faCommentDots} size="sm" />
          <span>Комментарии</span>
        </button>

        <button
          type="button"
          className="note-btn note-btn-delete"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrash} size="sm" />
          <span>Удалить</span>
        </button>
      </div>
    </div>
  );
}