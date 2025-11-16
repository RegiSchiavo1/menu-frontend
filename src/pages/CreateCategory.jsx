// src/pages/CreateCategory.jsx

import { useState } from "react";
import { createCategory } from "../services/api"; 
import Swal from "sweetalert2";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateCategory() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setName(e.target.value);
  }

  async function handleSubmit() {
    setLoading(true);

    const dataToSend = {
      name: name // El DTO C# espera 'Name'
    };

    try {
      const newCategory = await createCategory(dataToSend);

      // ÉXITO (SweetAlert2)
      Swal.fire({
          title: "¡Categoría Creada! 🏷️",
          text: `La categoría "${newCategory.name}" se agregó correctamente.`,
          icon: "success",
          confirmButtonText: "OK"
      }).then(() => nav("/categories")); // Navegar a la lista de categorías
      
    } catch (error) {
      // MANEJO DE ERRORES (SweetAlert2)
      let errorText = "No se pudo crear la categoría.";
      
      // El backend devuelve 409 Conflict si ya existe o 400 Bad Request si faltan datos.
      if (error.response) {
          if (error.response.status === 409) {
              errorText = "Ya existe una categoría con ese nombre.";
          } else if (error.response.data && typeof error.response.data === 'string') {
               errorText = error.response.data; 
          }
      }
      
      Swal.fire({
          title: "Error",
          text: errorText,
          icon: "error",
          confirmButtonText: "Entendido"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2,  }}>
        Crear Nueva Categoría
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField 
            label="Nombre de la Categoría" 
            name="name" 
            value={name}
            onChange={handleChange} 
            disabled={loading}
        />
        
        <Button 
            variant="contained" 
            onClick={handleSubmit} 
            disabled={loading || name.trim() === ""}
        >
          {loading ? 'Guardando...' : 'Guardar Categoría'}
        </Button>
      </Box>
    </Container>
  );
}