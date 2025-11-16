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
        console.log("DATA RESTAURANTS:", res.data);
        setRestaurants(res.data);
      })
      .catch((error) => console.error("Error cargando restaurantes:", error));
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Restaurantes
      </Typography>

      <Grid container spacing={3}>
        {restaurants.map((r) => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <RestaurantCard restaurant={r} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}






