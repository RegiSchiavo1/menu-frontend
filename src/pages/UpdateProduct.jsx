// src/pages/UpdateProduct.jsx

import { useState, useEffect } from "react";
import { updateProduct, getProductById } from "../services/api"; 
import Swal from "sweetalert2";
import { Container, TextField, Button, Typography, Box, CircularProgress, FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; 

export default function UpdateProduct() {
  const nav = useNavigate();
  const { productId } = useParams(); // 1. Obtiene el ID de la URL
  const [form, setForm] = useState(null); // Estado inicial es null para cargar
  const [loading, setLoading] = useState(true);

  // 2. CARGA INICIAL DE DATOS
  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(productId); 
        // Inicializa el formulario con los datos del producto existente
        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          categoryId: 1, // Nota: Estos IDs deben ser cargados dinámicamente si los vas a cambiar
          restaurantId: 1, 
          discountPercentage: data.discountPercentage,
          happyHour: data.happyHour,
          favorite: data.isRecommended // El DTO usa 'IsRecommended', el form usa 'favorite'
        });
      } catch (error) {
        Swal.fire('Error al cargar', 'No se pudieron cargar los datos del producto.', 'error');
        nav('/products'); // Regresar si falla la carga
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId, nav]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  // 3. MANEJO DEL SUBMIT CON SWEETALERT2
  async function handleSubmit() {
    if (!form) return;
    
    // Convertir el precio y porcentaje a números (el input 'number' los devuelve como string)
    const dataToSend = {
      ...form,
      price: parseFloat(form.price),
      discountPercentage: parseInt(form.discountPercentage),
    };

    try {
      const updatedProduct = await updateProduct(productId, dataToSend);

      // NOTIFICACIÓN DE ÉXITO
      Swal.fire({
          title: "¡Producto Actualizado! 🎉",
          text: `El producto "${updatedProduct.name}" se modificó correctamente.`,
          icon: "success",
          confirmButtonText: "OK"
      }).then(() => nav("/products")); // Navegar a la lista
      
    } catch (error) {
      // MANEJO DE ERRORES DEL BACKEND
      let errorText = "No se pudo actualizar el producto. Verifica los datos o el servidor.";
      
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

  if (loading || form === null) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Actualizar Producto: {form.name}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre" name="name" value={form.name} onChange={handleChange} />
        <TextField label="Descripción" name="description" value={form.description} onChange={handleChange} />
        <TextField 
            label="Precio" 
            name="price" 
            type="number" 
            value={form.price} 
            onChange={handleChange} 
            inputProps={{ step: "0.01" }}
        />
        <TextField label="Descuento (%)" name="discountPercentage" type="number" value={form.discountPercentage} onChange={handleChange} />

        {/* Checkboxes */}
        <FormControlLabel
            control={
                <Checkbox 
                    name="happyHour" 
                    checked={form.happyHour} 
                    onChange={handleChange} 
                />
            }
            label="Happy Hour"
        />
        <FormControlLabel
            control={
                <Checkbox 
                    name="favorite" 
                    checked={form.favorite} 
                    onChange={handleChange} 
                />
            }
            label="Recomendado"
        />
        {/* Aquí irían SELECTs para CategoryId y RestaurantId */}
        
        <Button variant="contained" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Box>
    </Container>
  );
}