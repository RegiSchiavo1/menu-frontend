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

  return (
    <AppBar position="static" elevation={0}>
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
          }}
        >
          Menu Digital
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>

          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/restaurants">Restaurantes</Button>
          <Button color="inherit" component={Link} to="/products">Productos</Button>

          {/* SI NO ESTA LOGUEADO → ICONO DEL LOGIN */}
          {!token && (
            <IconButton color="inherit" onClick={handleHostLogin}>
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            </IconButton>
          )}

          {/* SI ES HOST → MENU ADMIN */}
          {host && (
            <>
              <Button color="inherit" component={Link} to="/restaurants/create">
                Crear Restaurante
              </Button>
              <Button color="inherit" component={Link} to="/restaurants/delete">
                Eliminar Restaurante
              </Button>
              <Button color="inherit" component={Link} to="/categories">
                Categorías
              </Button>
              <Button color="inherit" component={Link} to="/products/adjust-prices">
                Ajuste de Precios
              </Button>

              {/* LOGOUT */}
              <Button color="inherit" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}




