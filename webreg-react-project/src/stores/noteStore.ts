import type { NoteCreate, NoteResponse } from "../types/note";
import { api } from "../api/ax";
import { create } from "zustand";

export interface NoteCreateResult {
  success: boolean;
  error: string;
}

interface NoteStore {
  notes: NoteResponse[];

  create: (data: NoteCreate) => Promise<NoteCreateResult>;
  delete: (id: string) => Promise<NoteCreateResult>;
  getAll: () => Promise<NoteCreateResult>;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],

  create: async (data: NoteCreate) => {
    try {
      const resp = await api.post<NoteResponse>("/notes", data);
      set((state) => ({ notes: [...state.notes, resp.data] }));
      return { success: true, error: "" };
    } catch (err: any) {
      console.error("create note error", err);
      return { success: false, error: "Не удалось создать" };
    }
  },

  delete: async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      set((state) => ({
        notes: state.notes.filter((n) => String(n.id) !== String(id)),
      }));
      return { success: true, error: "" };
    } catch (err: any) {
      console.error("delete note error", err);
      return { success: false, error: "Не удалось удалить" };
    }
  },

  getAll: async () => {
    try {
      const resp = await api.get<NoteResponse[]>("/notes");
      set({ notes: resp.data });
      return { success: true, error: "" };
    } catch (err: any) {
      console.error("getAll notes error", err);
      return { success: false, error: "Не удалось загрузить" };
    }
  },
}));
