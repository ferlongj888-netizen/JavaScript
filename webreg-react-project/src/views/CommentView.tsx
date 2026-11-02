import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCommentStore } from "../stores/commentStore";
import Comment from "../components/Comment";

export default function CommentNoteView() {
  const params = useParams();
  const noteId = params.note_id;

  const [isLoading, setIsLoading] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const comments = useCommentStore((state) => noteId ? state.comments[noteId] || [] : []);
  const getNoteCom = useCommentStore((state) => state.getNoteCom);
  const createNoteCom = useCommentStore((state) => state.createNoteCom);
  const updateNoteCom = useCommentStore((state) => state.updateNoteCom);
  const deleteNoteCom = useCommentStore((state) => state.deleteNoteCom);

  useEffect(() => {
    if (!noteId) return;

    const load = async () => {
      setIsLoading(true);
      const res = await getNoteCom(noteId);
      if (!res.success) setError(res.error);
      setIsLoading(false);
    };
    load();
  }, [noteId, getNoteCom]);

  if (!noteId) return <div>Заметка не найдена</div>;

  const handleCreate = async () => {
    if (!newContent.trim()) return;
    setIsSending(true);
    const res = await createNoteCom(noteId, newContent);
    setIsSending(false);
    if (res.success) {
      setNewContent("");
      setError(null);
    } else {
      setError(res.error);
    }
  };

  const handleUpdate = async (comment_id: string, content: string) => {
    const res = await updateNoteCom(noteId, comment_id, content);
    if (!res.success) setError(res.error);
    return res.success;
  };

  const handleDelete = async (comment_id: string) => {
    const res = await deleteNoteCom(noteId, comment_id);
    if (!res.success) setError(res.error);
    return res.success;
  };

  return (
    <div>
      <div className="notes-card">
        {isLoading && <div>Загрузка...</div>}

        {!isLoading && (
          <div className="notes-card-container">
            {comments.length === 0 ? (
              <div>Комментариев пока нет</div>
            ) : (
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}

        {error && <div className="error-text">{error}</div>}

        <div className="comm-create">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Напишите комментарий..."
            className="comm-textarea"
          />
          <button onClick={handleCreate} disabled={isSending || !newContent.trim()}>
            {isSending ? "Отправка..." : "Отправить"}
          </button>
        </div>
      </div>
    </div>
  );
}