import { Link, Outlet } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPen, faArrowRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Root() {
  return (
    <div className="app-wrapper">
      <nav className="top-nav-bar">
        <Link to="/" className="nav-btn">
          <FontAwesomeIcon icon={faHome} style={{ color: "#7b8cd6" }} />
          {" "}Главная
        </Link>

        <Link to="note/create" className="nav-btn">
          <FontAwesomeIcon icon={faPen} style={{ color: "#7b8cd6" }} />
          {" "}Создать заметку
        </Link>

        <Link to="login" className="nav-btn">
          <FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: "#7b8cd6" }} />
          {" "}Войти
        </Link>

        <Link to="register" className="nav-btn">
          <FontAwesomeIcon icon={faUser} style={{ color: "#7b8cd6" }} />
          {" "}Регистрация
        </Link>
      </nav>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}