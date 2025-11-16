import { useState, useEffect } from "react";
import { api } from "../services/api";
import RestaurantCard from "../components/RestaurantCard";
import { Box, Grid, Typography } from "@mui/material";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api
      .get("/restaurant")
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((error) => console.error("Error cargando restaurantes:", error));
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "100vh",
        backgroundColor: "#0f1b2b",
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          fontFamily: `"DM Serif Text", serif`,
          fontSize: "2.6rem",
          letterSpacing: "1px",
        }}
      >
        Restaurantes
      </Typography>

      <Grid container spacing={4}>
        {restaurants.map((r) => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <RestaurantCard restaurant={r} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}








