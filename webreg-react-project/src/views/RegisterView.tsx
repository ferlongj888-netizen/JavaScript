import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router";

export default function RegisterView() {
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password_confirm: "",
  });

  useEffect(() => {
    if (formData.password !== formData.password_confirm) {
      setError("Пароли не совпадают");
    } else {
      setError(null);
    }
  }, [formData]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
      <input
        value={formData.username}
        onChange={(ev) =>
          setFormData({
            ...formData,
            username: ev.target.value,
          })
        }
        placeholder="Логин"
      ></input>
      <input
        value={formData.email}
        onChange={(ev) =>
          setFormData({
            ...formData,
            email: ev.target.value,
          })
        }
        placeholder="E-Mail"
      ></input>
      <input
        value={formData.password}
        onChange={(ev) =>
          setFormData({
            ...formData,
            password: ev.target.value,
          })
        }
        placeholder="Пароль"
        type="password"
      ></input>
      <input
        value={formData.password_confirm}
        onChange={(ev) =>
          setFormData({
            ...formData,
            password_confirm: ev.target.value,
          })
        }
        placeholder="Повторите пароль"
        type="password"
      ></input>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={async () => {
          const res = await register({
            email: formData.email,
            password: formData.password,
            username: formData.username,
          });
          if(res.success) {
            setError(res.error);
          } else {
            navigate("/login");
          }
        }}
      >
        Зарегистрироваться
      </button>
    </div>
  );
}
