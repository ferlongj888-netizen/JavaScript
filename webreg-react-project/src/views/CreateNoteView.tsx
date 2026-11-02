import { NoteCreate } from "../components/NoteCreate";

export default function CreateNoteView() {
    return (
        <div>
            Давай создадам новую заметку!
            <NoteCreate></NoteCreate>
        </div>
    )
}