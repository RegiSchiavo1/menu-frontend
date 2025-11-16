// Archivo: src/components/RestaurantCard.jsx (CORREGIDO)

import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // 👈 Importar useNavigate

export default function RestaurantCard({ restaurant }) {
  if (!restaurant) return null;
  
  const navigate = useNavigate(); // 👈 Inicializar
  
  // Función para manejar la navegación al menú
  const handleNavigateToMenu = () => {
    // Codificamos el nombre para asegurar que los espacios/caracteres especiales
    // se pasen correctamente en la URL (ej: "Sushi Club" -> "Sushi%20Club")
    const encodedName = encodeURIComponent(restaurant.name);
    navigate(`/restaurants/${encodedName}/menu`);
  };

  return (
    <Card 
      onClick={handleNavigateToMenu} // 👈 Agregar evento onClick
      sx={{ 
        borderRadius: 3, 
        boxShadow: 3,
        cursor: 'pointer', // Indicamos interactividad
        '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' } // Efecto visual
      }}
    >
      <CardContent>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {restaurant.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          📍 Dirección: {restaurant.address}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          ☎ Teléfono: {restaurant.phoneNumber}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          📧 Email: {restaurant.email}
        </Typography>

      </CardContent>
    </Card>
  );
}


