import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./layouts/main-layout.tsx";
import ErrorView from "./views/ErrorView.tsx";
import IndexView from "./views/IndexView.tsx";
import CreateNoteView from "./views/CreateNoteView.tsx";
import RegisterView from "./views/RegisterView.tsx";
import LoginView from "./views/LoginView.tsx";
import CommentNoteView from "./views/CommentView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorView />,
    children: [
      { index: true, element: <IndexView /> },
      { path: "note/create", element: <CreateNoteView /> },
      { path: "register", element: <RegisterView /> },
      { path: "login", element: <LoginView /> },
      { path: "note/comment/:noteId", element: <CommentNoteView /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);