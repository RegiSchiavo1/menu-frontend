import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  if (!restaurant) return null;

  const navigate = useNavigate();

  const handleNavigateToMenu = () => {
    const encodedName = encodeURIComponent(restaurant.name);
    navigate(`/restaurants/${encodedName}/menu`);
  };

  return (
    <Card
      onClick={handleNavigateToMenu}
      sx={{
        width: "100%",
        minHeight: "220px",       // ⭐ MÁS ALTO
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(10px)",
        borderRadius: 4,
        padding: 2,
        cursor: "pointer",
        transition: "0.25s ease",
        border: "1px solid rgba(255,255,255,0.08)",
        "&:hover": {
          transform: "translateY(-8px) scale(1.04)",  // ⭐ HOVER MÁS GRANDE
          boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
          borderColor: "#64b5f6",
        },
      }}
    >
      <CardContent sx={{ py: 3 }}>
        <Typography
          variant="h5"                   // ⭐ MÁS GRANDE
          sx={{ fontWeight: "bold", mb: 2, color: "white" }}
        >
          {restaurant.name}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.3 }}>
          <Typography variant="body1" sx={{ color: "#cfd8dc" }}>
            📍 <strong>Dirección:</strong> {restaurant.address}
          </Typography>

          <Typography variant="body1" sx={{ color: "#cfd8dc" }}>
            ☎ <strong>Teléfono:</strong> {restaurant.phoneNumber}
          </Typography>

          <Typography variant="body1" sx={{ color: "#cfd8dc" }}>
            📧 <strong>Email:</strong> {restaurant.email}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}




