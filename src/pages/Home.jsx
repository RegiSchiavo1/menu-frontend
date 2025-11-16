import { Typography, Box, Button, useTheme } from "@mui/material";
import Swal from "sweetalert2";
import { loginGuest, loginHost } from "../utils/auth";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  const theme = useTheme();

  function handleGuest() {
    loginGuest();
    Swal.fire({
      title: "Modo invitado activado",
      text: "Podés ver el menú",
      icon: "success",
      confirmButtonText: "OK",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      confirmButtonColor: theme.palette.primary.main,
    });
    nav("/restaurants");
  }

  async function handleHost() {
    const { value: formValues } = await Swal.fire({
      title: "Iniciar sesión como HOST",
      html: `
        <input id="swal-email" class="swal2-input" placeholder="Email">
        <input id="swal-pass" type="password" class="swal2-input" placeholder="Contraseña">
      `,
      focusConfirm: false,
      preConfirm: () => ({
        email: document.getElementById("swal-email").value,
        passwordHash: document.getElementById("swal-pass").value
      }),
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      confirmButtonColor: theme.palette.primary.main,
    });

    if (!formValues) return;

    try {
      const token = await login(formValues);
      loginHost(token);
      Swal.fire({
        title: "Bienvenido!",
        text: "Inicio de sesión exitoso",
        icon: "success",
      });
      nav("/restaurants");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Credenciales incorrectas",
        icon: "error",
      });
    }
  }

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ml: 10,
        color: "white",
      }}
    >
      {/* TÍTULO PREMIUM */}
      <Typography
        variant="h1"
        sx={{
          fontFamily: `"DM Serif Text", serif`,
          fontSize: "3.2rem",
          maxWidth: "600px",
          lineHeight: 1.2,
          mb: 3,
        }}
      >
        Explora Menús, Descubrí Sabores Únicos.
      </Typography>

      {/* SUBTÍTULO */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: "460px",
          fontSize: "1.2rem",
          color: theme.palette.text.secondary,
          mb: 5,
        }}
      >
        Tu próxima experiencia gastronómica, a un clic de distancia.
      </Typography>

      {/* BOTONES PRINCIPALES */}
      <Box sx={{ display: "flex", gap: 3 }}>
        <Button variant="contained" size="large" onClick={() => nav("/restaurants")}>
          Ver Restaurantes
        </Button>

        <Button variant="outlined" size="large" onClick={() => nav("/products")}>
          Explorar Productos
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleHost}
        >
          Iniciar Sesión 🔐
        </Button>
      </Box>

      {/* BOTÓN INVITADO (opcional dejar abajo) */}
      <Box sx={{ mt: 4 }}>
        <Button variant="text" sx={{ color: "#E0E1DD" }} onClick={handleGuest}>
          Continuar como Invitado 👤
        </Button>
      </Box>
    </Box>
  );
}

