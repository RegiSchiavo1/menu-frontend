// src/pages/CreateProduct.jsx

import { useState } from "react";
import { createProduct } from "../services/api"; 
import Swal from "sweetalert2";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const nav = useNavigate();
  // Nota: Debes poblar las listas de CategoryId y RestaurantId dinámicamente.
  // Por simplicidad, aquí usamos valores de prueba.
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: 1,      // ¡AJUSTAR!
    restaurantId: 1,    // ¡AJUSTAR!
    discountPercentage: 0,
    happyHour: false,
    favorite: false
  });

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  }

  async function handleSubmit() {
    try {
      const newProduct = await createProduct(form);

      Swal.fire({
          title: "¡Producto Creado! ✨",
          text: `El producto "${newProduct.name}" se agregó.`,
          icon: "success",
          confirmButtonText: "OK"
      }).then(() => nav("/products")); // Navegar a la lista
      
    } catch (error) {
      // Manejando errores del backend
      let errorText = "No se pudo crear el producto. Revisa los datos (categoría/restaurante existentes).";
      
      if (error.response && error.response.data && typeof error.response.data === 'string') {
          errorText = error.response.data; 
      }
      
      Swal.fire({
          title: "Error",
          text: errorText,
          icon: "error",
          confirmButtonText: "Entendido"
      });
    }
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Crear Nuevo Producto
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre" name="name" onChange={handleChange} />
        <TextField label="Descripción" name="description" onChange={handleChange} />
        <TextField label="Precio" name="price" type="number" onChange={handleChange} />
        {/* Aquí irían SELECTs para CategoryId y RestaurantId */}
        
        <Button variant="contained" onClick={handleSubmit}>
          Guardar Producto
        </Button>
      </Box>
    </Container>
  );
}