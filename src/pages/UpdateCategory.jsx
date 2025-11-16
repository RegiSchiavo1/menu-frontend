// src/pages/UpdateCategory.jsx

import { useState, useEffect } from "react";
import { updateCategory, getCategoryById } from "../services/api"; 
import Swal from "sweetalert2";
import { Container, TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; 

export default function UpdateCategory() {
  const nav = useNavigate();
  const { categoryId } = useParams(); // Obtiene el ID de la URL
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // Carga inicial de datos (GET api/categories/{id})
  useEffect(() => {
    async function fetchCategory() {
      try {
        const data = await getCategoryById(categoryId); 
        setName(data.name); 
      } catch (error) {
        Swal.fire('Error al cargar', 'No se pudieron cargar los datos de la categoría.', 'error');
        nav('/categories'); // Regresar si falla la carga
      } finally {
        setLoading(false);
      }
    }

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId, nav]);

  function handleChange(e) {
    setName(e.target.value);
  }

  // Manejo del submit (PUT api/categories/{id})
  async function handleSubmit() {
    setLoading(true);
    
    const dataToSend = {
      name: name.trim() // El DTO C# espera 'Name'
    };
    
    // Verificación básica
    if (dataToSend.name === "") {
        Swal.fire('Atención', 'El nombre no puede estar vacío.', 'warning');
        setLoading(false);
        return;
    }

    try {
      const updatedCategory = await updateCategory(categoryId, dataToSend);

      // NOTIFICACIÓN DE ÉXITO
      Swal.fire({
          title: "¡Categoría Actualizada! 🎉",
          text: `La categoría "${updatedCategory.name}" se modificó correctamente.`,
          icon: "success",
          confirmButtonText: "OK"
      }).then(() => nav("/categories")); // Navegar a la lista
      
    } catch (error) {
      // MANEJO DE ERRORES DEL BACKEND
      let errorText = "No se pudo actualizar la categoría. Revisa el nombre.";
      
      if (error.response) {
          if (error.response.status === 404) {
              errorText = `Categoría ID ${categoryId} no encontrada.`;
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

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Editar Categoría ID: {categoryId}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField 
            label="Nuevo Nombre de la Categoría" 
            name="name" 
            value={name}
            onChange={handleChange} 
            disabled={loading}
        />
        
        <Button 
            variant="contained" 
            onClick={handleSubmit} 
            disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </Box>
    </Container>
  );
}