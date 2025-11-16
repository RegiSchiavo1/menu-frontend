import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import {
  setHappyHour,
  updateDiscount,
  increasePrices,
  getHappyHourStatus,
} from "../services/api";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
} from "@mui/material";

export default function PriceAdjuster() {
  const [restaurantId, setRestaurantId] = useState(1);
  const [happyHourEnabled, setHappyHourEnabled] = useState(false);

  const [discountForm, setDiscountForm] = useState({
    productId: "",
    percentage: 0,
  });

  const [priceAdjustForm, setPriceAdjustForm] = useState({
    restaurantId: 1,
    percentage: 0,
  });

  // ====================================================
  // 🔵 Cargar estado del backend
  // ====================================================
  useEffect(() => {
    async function fetchStatus() {
      try {
        const status = await getHappyHourStatus(restaurantId);
        setHappyHourEnabled(status);
      } catch (error) {
        console.error("Error al cargar Happy Hour:", error);
      }
    }
    fetchStatus();
  }, [restaurantId]);

  // ====================================================
  // Input handler
  // ====================================================
  const handleIdChange = (e) =>
    setRestaurantId(parseInt(e.target.value) || 0);

  // ====================================================
  // HAPPY HOUR
  // ====================================================
  async function handleSetHappyHour() {
    try {
      const res = await setHappyHour(restaurantId, happyHourEnabled);
      Swal.fire(
        "¡Actualizado!",
        `Se modificó Happy Hour para ${res.affected} productos.`,
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo aplicar Happy Hour masivo.", "error");
    }
  }

  // ====================================================
  // DESCUENTO INDIVIDUAL
  // ====================================================
  async function handleUpdateDiscount() {
    try {
      await updateDiscount(discountForm.productId, discountForm.percentage);

      Swal.fire(
        "¡Descuento Aplicado!",
        `El producto ID ${discountForm.productId} fue actualizado.`,
        "success"
      );

      setDiscountForm({ productId: "", percentage: 0 });
    } catch (error) {
      Swal.fire("Error", "No se pudo aplicar el descuento.", "error");
    }
  }

  // ====================================================
  // AJUSTE MASIVO DE PRECIOS
  // ====================================================
  async function handleIncreasePrices() {
    try {
      const res = await increasePrices(
        priceAdjustForm.restaurantId,
        priceAdjustForm.percentage
      );

      Swal.fire(
        "¡Precios Ajustados!",
        `Se ajustaron ${res.length} productos en ${priceAdjustForm.percentage}%.`,
        "success"
      );
    } catch (error) {
      let msg = "Error al ajustar precios.";
      if (error.response?.data) msg = error.response.data;
      Swal.fire("Error", msg, "error");
    }
  }

  // ====================================================
  // 🎨 INPUT STYLE (reusable)
  // ====================================================
  const inputStyle = {
    input: { color: "white" },
    label: { color: "#bfc7d5" },
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      "& fieldset": {
        borderColor: "#1e4f8e",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4a8cff",
        boxShadow: "0 0 8px #4a8cff",
      },
    },
  };

  // ====================================================
  // RENDER
  // ====================================================
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0f1b2b",
        color: "white",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            fontFamily: `"DM Serif Text", serif`,
          }}
        >
          Herramientas de Precios y Ofertas
        </Typography>

        {/* ==================================================== */}
        {/* CONFIGURACIÓN GENERAL */}
        {/* ==================================================== */}
        <Card sx={{ backgroundColor: "#152232", borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Configuración General
            </Typography>

            <TextField
              label="ID del Restaurante"
              fullWidth
              type="number"
              value={restaurantId}
              onChange={handleIdChange}
              sx={{ mb: 2, ...inputStyle }}
            />
          </CardContent>
        </Card>

        {/* ==================================================== */}
        {/* HAPPY HOUR */}
        {/* ==================================================== */}
        <Card sx={{ backgroundColor: "#152232", borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              1. Happy Hour Masivo
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={happyHourEnabled}
                  onChange={(e) => setHappyHourEnabled(e.target.checked)}
                />
              }
              label={happyHourEnabled ? "HABILITADO" : "DESHABILITADO"}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, p: 1.5 }}
              onClick={handleSetHappyHour}
            >
              Aplicar a Todos los Productos
            </Button>
          </CardContent>
        </Card>

        {/* ==================================================== */}
        {/* DESCUENTO INDIVIDUAL */}
        {/* ==================================================== */}
        <Card sx={{ backgroundColor: "#152232", borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              2. Ajustar Descuento Individual
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ID Producto"
                  type="number"
                  fullWidth
                  value={discountForm.productId}
                  onChange={(e) =>
                    setDiscountForm({
                      ...discountForm,
                      productId: parseInt(e.target.value) || "",
                    })
                  }
                  sx={inputStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Porcentaje (%)"
                  type="number"
                  fullWidth
                  value={discountForm.percentage}
                  onChange={(e) =>
                    setDiscountForm({
                      ...discountForm,
                      percentage: parseInt(e.target.value) || 0,
                    })
                  }
                  sx={inputStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ p: 1.5 }}
                  onClick={handleUpdateDiscount}
                >
                  Actualizar Descuento
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* ==================================================== */}
        {/* AJUSTE MASIVO */}
        {/* ==================================================== */}
        <Card sx={{ backgroundColor: "#152232", borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              3. Aumento/Reducción de Precios Masivo
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Porcentaje de Cambio"
                  type="number"
                  fullWidth
                  value={priceAdjustForm.percentage}
                  onChange={(e) =>
                    setPriceAdjustForm({
                      ...priceAdjustForm,
                      percentage:
                        parseFloat(e.target.value) || 0,
                    })
                  }
                  sx={inputStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ p: 1.5 }}
                  onClick={handleIncreasePrices}
                >
                  Aplicar Ajuste
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

