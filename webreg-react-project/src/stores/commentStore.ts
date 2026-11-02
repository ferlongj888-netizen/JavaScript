import { create } from "zustand";
import { api } from "../api/ax";
import type { CommentResponse } from "../types/comment";

export interface CommentResult {
  success: boolean;
  error: string | null;
}

export interface CommentState {
  comments: Record<string, CommentResponse[]>;

  getNoteCom: (note_id: string) => Promise<CommentResult>;
  createNoteCom: (note_id: string, content: string) => Promise<CommentResult>;
  updateNoteCom: (
    note_id: string,
    comment_id: string,
    content: string,
  ) => Promise<CommentResult>;
  deleteNoteCom: (
    note_id: string,
    comment_id: string,
  ) => Promise<CommentResult>;
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: {},

  getNoteCom: async (note_id: string) => {
    try {
      const resp = await api.get<CommentResponse[]>(
        `/notes/${note_id}/comment`,
      );
      set((state) => ({
        comments: {
          ...state.comments,
          [note_id]: resp.data,
        },
      }));
      return { success: true, error: null };
    } catch (err) {
      console.error("Ошибка загрузки комментариев:", err);
      return { success: false, error: "Не удалось загрузить комментарии" };
    }
  },

  createNoteCom: async (note_id: string, content: string) => {
    try {
      const resp = await api.post<CommentResponse>(
        `/notes/${note_id}/comment`,
        { content },
      );
      set((state) => {
        const current = state.comments[note_id] || [];
        return {
          comments: {
            ...state.comments,
            [note_id]: [...current, resp.data],
          },
        };
      });
      return { success: true, error: null };
    } catch (err) {
      console.error("Ошибка создания комментария:", err);
      return { success: false, error: "Не удалось создать комментарий" };
    }
  },

  updateNoteCom: async (
    note_id: string,
    comment_id: string,
    content: string,
  ) => {
    try {
      const resp = await api.patch<CommentResponse>(
        `/notes/${note_id}/comment/${comment_id}`,
        { content },
      );
      set((state) => {
        const current = state.comments[note_id] || [];
        return {
          comments: {
            ...state.comments,
            [note_id]: current.map((c) =>
              c.id === comment_id ? resp.data : c,
            ),
          },
        };
      });
      return { success: true, error: null };
    } catch (err) {
      console.error("Ошибка изменения комментария:", err);
      return { success: false, error: "Не удалось изменить комментарий" };
    }
  },

  deleteNoteCom: async (note_id: string, comment_id: string) => {
    try {
      await api.delete(`/notes/${note_id}/comment/${comment_id}`);
      set((state) => {
        const current = state.comments[note_id] || [];
        return {
          comments: {
            ...state.comments,
            [note_id]: current.filter((c) => c.id !== comment_id),
          },
        };
      });
      return { success: true, error: null };
    } catch (err) {
      console.error("Ошибка удаления комментария:", err);
      return { success: false, error: "Не удалось удалить комментарий" };
    }
  },
}));