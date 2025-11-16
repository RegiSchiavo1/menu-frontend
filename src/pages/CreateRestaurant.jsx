import { useState } from "react";
import { api } from "../services/api";
import Swal from "sweetalert2";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateRestaurant() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    api
      .post("/restaurant", form)
      .then(() => {
        Swal.fire({
          title: "Restaurante creado ✨",
          text: "Se agregó correctamente",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => nav("/restaurants"));
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "No se pudo crear el restaurante",
          icon: "error",
          confirmButtonText: "Entendido"
        });
      });
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Crear Restaurante
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre" name="name" onChange={handleChange} />
        <TextField label="Dirección" name="address" onChange={handleChange} />
        <TextField label="Teléfono" name="phoneNumber" onChange={handleChange} />
        <TextField label="Email" name="email" onChange={handleChange} />
        <TextField label="Contraseña" name="password" type="password" onChange={handleChange} />

        <Button variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
      </Box>
    </Container>
  );
}

