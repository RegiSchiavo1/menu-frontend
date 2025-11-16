import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isHost, logout } from "../utils/auth";
import Swal from "sweetalert2";

export default function Navbar() {
  const nav = useNavigate();
  const host = isHost();

  function handleLogout() {
    logout();
    Swal.fire({
      icon: "info",
      title: "Sesión cerrada",
      text: "Saliste del modo administrador",
      confirmButtonText: "OK",
    });
    nav("/");
  }

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LOGO + título elegante */}
        <Box sx={{ fontFamily: `"DM Serif Text", serif`, fontSize: "1.5rem", color: "white" }}>
          Menu Digital
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/restaurants">Restaurantes</Button>
          <Button color="inherit" component={Link} to="/products">Productos</Button>

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



