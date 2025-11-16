import { AppBar, Toolbar, Button, Box, IconButton, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isHost, logout, getToken } from "../utils/auth";
import Swal from "sweetalert2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { login } from "../services/api";

export default function Navbar() {
  const nav = useNavigate();
  const theme = useTheme();
  const host = isHost();
  const token = getToken();

  async function handleHostLogin() {
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
      localStorage.setItem("token", token);
      localStorage.setItem("role", "host");

      Swal.fire({
        title: "Bienvenido!",
        text: "Inicio de sesión exitoso",
        icon: "success",
      });

      nav("/restaurants");
    } catch {
      Swal.fire({
        title: "Error",
        text: "Credenciales incorrectas",
        icon: "error",
      });
    }
  }

  function handleLogout() {
    logout();
    Swal.fire({
      icon: "info",
      title: "Sesión cerrada",
      text: "Saliste del modo administrador",
    });
    nav("/");
  }

  const linkHover = {
    transition: "0.3s",
    paddingX: 1.5,
    paddingY: 0.5,
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(6px)",
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#0f1b2b",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* LOGO */}
        <Box
          component={Link}
          to="/"
          sx={{
            fontFamily: `"DM Serif Text", serif`,
            fontSize: "1.6rem",
            color: "white",
            textDecoration: "none",
            transition: "0.3s",
            "&:hover": { color: "#bcd7ff" }
          }}
        >
          Menu Digital
        </Box>

        {/* LINKS */}
        <Box sx={{ display: "flex", gap: 2 }}>

          <Button component={Link} to="/" color="inherit" sx={linkHover}>
            Home
          </Button>

          <Button component={Link} to="/restaurants" color="inherit" sx={linkHover}>
            Restaurantes
          </Button>

          <Button component={Link} to="/products" color="inherit" sx={linkHover}>
            Productos
          </Button>

          {/* ICONO LOGIN */}
          {!token && (
            <IconButton color="inherit" onClick={handleHostLogin} sx={linkHover}>
              <AccountCircleIcon sx={{ fontSize: 30 }} />
            </IconButton>
          )}

          {/* MENU ADMIN */}
          {host && (
            <>
              <Button component={Link} to="/restaurants/create" color="inherit" sx={linkHover}>
                Crear Restaurante
              </Button>

              <Button component={Link} to="/restaurants/delete" color="inherit" sx={linkHover}>
                Eliminar Restaurante
              </Button>

              <Button component={Link} to="/categories" color="inherit" sx={linkHover}>
                Categorías
              </Button>

              <Button component={Link} to="/products/adjust-prices" color="inherit" sx={linkHover}>
                Ajuste de Precios
              </Button>

              <Button color="inherit" onClick={handleLogout} sx={linkHover}>
                Cerrar Sesión
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}





