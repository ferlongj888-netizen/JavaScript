import { useState } from "react";
import type { CommentResponse } from "../types/comment";
import { useAuthStore } from "../stores/authStore";

interface CommentProps {
  comment: CommentResponse;
  onUpdate: (comment_id: string, content: string) => Promise<boolean>;
  onDelete: (comment_id: string) => Promise<boolean>;
}

export default function Comment({ comment, onUpdate, onDelete }: CommentProps) {
  const currentUser = useAuthStore((state) => state.user);
  const isAuthor = currentUser?.id === comment.author_id;

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(comment.content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!draft.trim()) return;
    setIsSaving(true);
    const ok = await onUpdate(comment.id, draft);
    setIsSaving(false);
    if (ok) setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm("Удалить комментарий?")) return;
    await onDelete(comment.id);
  };

  const displayDate = comment.updated_at !== comment.created_at
    ? `изменено ${new Date(comment.updated_at).toLocaleString()}`
    : new Date(comment.created_at).toLocaleString();

  return (
    <div className="comm-container">
      <div className="comm-header">
        <span className="comm-author">{comment.author_username}</span>
        <span className="comm-date">{displayDate}</span>
      </div>

      {isEditing ? (
        <div className="comm-edit">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="comm-textarea"
          />
          <div className="comm-actions">
            <button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Сохранение..." : "Сохранить"}
            </button>
            <button onClick={() => { setDraft(comment.content); setIsEditing(false); }}>
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="comm-body">{comment.content}</div>
          {isAuthor && (
            <div className="comm-actions">
              <button onClick={() => setIsEditing(true)}>Изменить</button>
              <button onClick={handleDelete} className="comm-delete">Удалить</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}