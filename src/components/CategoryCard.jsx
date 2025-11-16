import { Card, CardContent, Typography } from "@mui/material";

export default function CategoryCard({ category }) {
  if (!category) return null;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {category.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          ID: {category.categoryId}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Cantidad de productos: {category.productIds.length}
        </Typography>

      </CardContent>
    </Card>
  );
}
