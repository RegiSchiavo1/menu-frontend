// src/pages/CategoryList.jsx

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getCategories, deleteCategory } from "../services/api"; 
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { isHost } from "../utils/auth";
import { useNavigate } from "react-router-dom"; 

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const host = isHost();

  // Función para cargar categorías (GET api/categories)
  const fetchCategories = () => {
    setLoading(true);
    getCategories()
      .then((categoriesArray) => {
          // ✅ CORRECCIÓN CLAVE: El resultado de getCategories() (categoriesArray) 
          // ya es el ARRAY DE CATEGORÍAS (gracias a 'return res.data' en api.js).
          // Por lo tanto, no se debe acceder a .data otra vez.
          setCategories(categoriesArray || []); 
      })
      .catch((error) => console.error("Error al cargar categorías:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🗑️ LÓGICA DE ELIMINACIÓN CON SWEETALERT2 (DELETE api/categories/{id})
  async function handleDelete(id, name) {
    const result = await Swal.fire({
      title: `¿Eliminar la categoría "${name}"?`,
      text: "Esto puede afectar a los productos asociados.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteCategory(id);

        // ÉXITO (Backend devuelve 200 Ok con un mensaje)
        Swal.fire(
          '¡Eliminado!',
          response, // Muestra el mensaje de éxito del backend
          'success'
        );
        
        fetchCategories(); // Actualizar lista

      } catch (error) {
        // ERROR (Manejo de errores 4xx/5xx)
        let errorText = "No se pudo eliminar la categoría.";
        
        Swal.fire(
          '¡Error!',
          errorText,
          'error'
        );
      }
    }
  }

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Gestión de Categorías
      </Typography>

      {/* Botón para crear nueva categoría (navega a CreateCategory.jsx) */}
      {host && (
        <Button
          variant="contained"
          sx={{ mb: 3 }}
          onClick={() => nav('/categories/create')}
        >
          Crear Nueva Categoría
        </Button>
      )}

      {categories.length === 0 ? (
          <Typography>No hay categorías registradas.</Typography>
      ) : (
          <List>
            {categories.map((c) => (
              <ListItem 
                  key={c.categoryId} 
                  divider 
                  sx={{ background: host ? '#f5f5f5' : 'transparent', borderRadius: 1 }}
              >
                <ListItemText 
                    primary={c.name} 
                    secondary={`ID: ${c.categoryId}`} 
                />
                
                {/* 🔒 ACCIONES DE HOST */}
                {host && (
                  <ListItemSecondaryAction>
                    {/* Botón de Edición (navega a UpdateCategory.jsx) */}
                    <IconButton 
                        edge="end" 
                        aria-label="edit" 
                        onClick={() => nav(`/categories/update/${c.categoryId}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    
                    {/* Botón de Eliminación */}
                    <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        onClick={() => handleDelete(c.categoryId, c.name)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
      )}
    </Box>
  );
}