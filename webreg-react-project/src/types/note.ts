export type NoteCreate = {
  title: string;
  content: string;
  tags: string[];
};

export type NoteResponse = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author: string;
  created_at: Date;
  updated_at: Date;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string
};

export type RegisterResponse = {
  id: string;
  username: string;
  email: string;
};

