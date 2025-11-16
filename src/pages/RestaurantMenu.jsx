// Archivo: src/pages/RestaurantMenu.jsx (AJUSTADO)

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { Box, Typography, Card, CardContent, CircularProgress } from "@mui/material";

export default function RestaurantMenu() {
  // Asegúrate de que tu ruta en App.jsx use :restaurantName
  const { restaurantName } = useParams(); 
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Descodificar el nombre para mostrarlo correctamente ("Sushi%20Club" -> "Sushi Club")
  const decodedRestaurantName = decodeURIComponent(restaurantName); 

  useEffect(() => {
    setLoading(true);
    api
      .get(`/restaurant/${restaurantName}/menu`) // ✔ La llamada a la API usa el nombre CODIFICADO de la URL
      .then((res) => {
          setMenu(res.data);
      })
      .catch(() => setError("No se pudo cargar el menú."))
      .finally(() => setLoading(false));
  }, [restaurantName]);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Cargando menú de {decodedRestaurantName}...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Menú de {decodedRestaurantName} 
      </Typography>

      {error && (
        <Typography color="error" sx={{ fontWeight: "bold" }}>
          {error}
        </Typography>
      )}
      
      {menu.length === 0 && !error && (
         <Typography color="text.secondary">Este restaurante aún no tiene categorías ni productos cargados.</Typography>
      )}

      {menu.map((category) => (
        <Card key={category.categoryName} sx={{ mb: 3, p: 2, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            {category.categoryName}
          </Typography>

          {category.products?.length === 0 ? (
            <Typography color="text.secondary">
              No hay productos en esta categoría.
            </Typography>
          ) : (
            category.products.map((p) => (
              <Card
                key={p.id}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  background: "#fafafa",
                  boxShadow: 1
                }}
              >
                <CardContent sx={{ '&:last-child': { pb: 2 } }}> 
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {p.name}
                  </Typography>

                  <Typography>Precio: **${p.price}**</Typography>
                  <Typography>Happy Hour: **{p.happyHour ? "Sí" : "No"}**</Typography>
                  <Typography>Recomendado: **{p.isRecommended ? "Sí" : "No"}**</Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Card>
      ))}
    </Box>
  );
}



