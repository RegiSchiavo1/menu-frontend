// src/pages/PriceAdjuster.jsx

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { 
  setHappyHour, 
  updateDiscount, 
  increasePrices,
  getHappyHourStatus 
} from "../services/api";

import { 
  Container, TextField, Button, Typography, Box, Divider, Switch, FormControlLabel 
} from "@mui/material";

export default function PriceAdjuster() {

  const [restaurantId, setRestaurantId] = useState(1);
  const [happyHourEnabled, setHappyHourEnabled] = useState(false);
  const [discountForm, setDiscountForm] = useState({ productId: '', percentage: 0 });
  const [priceAdjustForm, setPriceAdjustForm] = useState({ restaurantId: 1, percentage: 0 });


  //  ⭐ CARGAR ESTADO REAL DEL BACKEND
  useEffect(() => {
    async function fetchStatus() {
      try {
        const status = await getHappyHourStatus(restaurantId);
        setHappyHourEnabled(status);
      } catch (error) {
        console.error("No se pudo cargar el estado de Happy Hour:", error);
      }
    }
    fetchStatus();
  }, [restaurantId]);


  const handleIdChange = (e) => setRestaurantId(parseInt(e.target.value) || 0);


  // === Happy Hour Masivo ===
  async function handleSetHappyHour() {
    try {
      const res = await setHappyHour(restaurantId, happyHourEnabled);
      Swal.fire(
        '¡Actualizado!',
        `Se modificó Happy Hour para ${res.affected} productos.`,
        'success'
      );
    } catch (error) {
      Swal.fire('Error', 'No se pudo aplicar Happy Hour masivo.', 'error');
    }
  }


  // === Descuento Individual ===
  async function handleUpdateDiscount() {
    try {
      await updateDiscount(discountForm.productId, discountForm.percentage);
      Swal.fire(
        '¡Descuento Aplicado!',
        `El descuento se actualizó para el producto ID ${discountForm.productId}.`,
        'success'
      );
      setDiscountForm({ productId: '', percentage: 0 });
    } catch (error) {
      Swal.fire('Error', 'No se pudo aplicar el descuento.', 'error');
    }
  }


  // === Aumento de Precios Masivo ===
  async function handleIncreasePrices() {
    try {
      const res = await increasePrices(priceAdjustForm.restaurantId, priceAdjustForm.percentage);
      Swal.fire(
        '¡Precios Ajustados!',
        `Se ajustaron ${res.length} productos en un ${priceAdjustForm.percentage}%.`,
        'success'
      );
    } catch (error) {
       let errorText = "Error al ajustar precios.";
       if (error.response && typeof error.response.data === 'string') {
            errorText = error.response.data; 
       }
       Swal.fire('Error', errorText, 'error');
    }
  }


  return (
    <Container sx={{ mt: 4 }}>

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Herramientas de Precios y Ofertas
      </Typography>

      <TextField 
        label="ID del Restaurante (General)" 
        type="number" 
        value={restaurantId} 
        onChange={handleIdChange} 
        sx={{ mb: 3 }}
      />


      {/* 1. HAPPY HOUR */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">1. Happy Hour Masivo</Typography>

        <FormControlLabel
          control={
            <Switch
              checked={happyHourEnabled}
              onChange={(e) => setHappyHourEnabled(e.target.checked)}
              color="primary"
            />
          }
          label={happyHourEnabled ? "HABILITADO" : "DESHABILITADO"}
        />

        <Button variant="contained" onClick={handleSetHappyHour} sx={{ ml: 2 }}>
          Aplicar a Todos los Productos
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* 2. DESCUENTO */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">2. Ajustar Descuento Individual</Typography>

        <TextField 
          label="ID Producto" 
          type="number" 
          value={discountForm.productId} 
          onChange={(e) => setDiscountForm({ ...discountForm, productId: parseInt(e.target.value) || '' })} 
          sx={{ mr: 2 }}
        />

        <TextField 
          label="Porcentaje (%)" 
          type="number" 
          value={discountForm.percentage} 
          onChange={(e) => setDiscountForm({ ...discountForm, percentage: parseInt(e.target.value) || 0 })} 
          sx={{ mr: 2 }}
        />

        <Button variant="contained" onClick={handleUpdateDiscount}>
          Actualizar Descuento
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />


      {/* 3. AJUSTE DE PRECIOS */}
      <Box>
        <Typography variant="h6">3. Aumento/Reducción de Precios Masivo</Typography>

        <TextField 
          label="Porcentaje de Cambio (Ej: 10 para +10%)" 
          type="number" 
          value={priceAdjustForm.percentage} 
          onChange={(e) => setPriceAdjustForm({ ...priceAdjustForm, percentage: parseFloat(e.target.value) || 0 })} 
          sx={{ mr: 2 }}
        />

        <Button variant="contained" onClick={handleIncreasePrices}>
          Aplicar Ajuste
        </Button>
      </Box>

    </Container>
  );
}
