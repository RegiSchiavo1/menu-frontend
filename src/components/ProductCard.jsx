import { Card, CardContent, Typography, Box } from "@mui/material";

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>

        {/* Nombre — puede venir como name O productName */}
        {(product.name || product.productName) && (
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {product.name ?? product.productName}
          </Typography>
        )}

        {/* Descripción */}
        {product.description && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            {product.description}
          </Typography>
        )}

        {/* Precio */}
        {product.price !== undefined && (
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
            Precio: ${product.price}
          </Typography>
        )}

        {/* Categoría */}
        {product.categoryName && (
          <Typography variant="caption" color="text.secondary">
            Categoría: {product.categoryName}
          </Typography>
        )}

        {/* Restaurante */}
        {product.restaurantName && (
          <>
            <br />
            <Typography variant="caption" color="text.secondary">
              Restaurante: {product.restaurantName}
            </Typography>
          </>
        )}

        {/* Happy Hour */}
        {product.happyHour && (
          <Box
            sx={{
              mt: 1,
              padding: "4px 8px",
              backgroundColor: "#ff4081",
              color: "white",
              borderRadius: 2,
              display: "inline-block",
              fontSize: "0.8rem",
            }}
          >
            Happy Hour 🎉
          </Box>
        )}

      </CardContent>
    </Card>
  );
}



