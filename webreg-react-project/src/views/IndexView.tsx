import { useEffect, useState } from "react";
import Note from "../components/Note";
import { useNoteStore } from "../stores/noteStore";
import "../App.css";

export default function IndexView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const notesStore = useNoteStore();

  useEffect(() => {
    const get_notes = async () => {
      setIsLoading(true);
      setError(null);

      const result = await notesStore.getAll();
      if (!result.success) {
        setError(result.error);
      }
      setIsLoading(false);
    };
    get_notes();
  }, []);

  return (
    <div className="notes-card">
      {error && <div className="error-message">Ошибка: {error}</div>}
      {isLoading && <div className="loading-message">Загрузка...</div>}
      <div className="notes-card-container">
        {!isLoading &&
          !error &&
          notesStore.notes.map((note) => (
            <Note key={note.id} {...note} />
          ))}
      </div>
    </div>
  );
}
