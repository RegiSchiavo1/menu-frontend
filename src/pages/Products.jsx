import { useState, useEffect } from "react";
import { 
  api, 
  getRestaurantsByProductName,
  getProductsByRestaurantAndCategory
} from "../services/api";

import ProductCard from "../components/ProductCard";

import { 
  Box, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress 
} from "@mui/material";

export default function Products() {

  // ======================
  // ESTADOS GENERALES
  // ======================
  const [products, setProducts] = useState([]);

  // ----------------------
  // BÚSQUEDA 1: Buscar RESTAURANTES por PRODUCTO
  // ----------------------
  const [searchTerm, setSearchTerm] = useState('');
  const [foundRestaurants, setFoundRestaurants] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  // ----------------------
  // BÚSQUEDA 2: Buscar PRODUCTOS por RESTAURANTE + CATEGORÍA
  // ----------------------
  const [restaurantInput, setRestaurantInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterError, setFilterError] = useState('');


  // ======================
  // 1. CARGA INICIAL DE PRODUCTOS
  // ======================
  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        console.log("DATA PRODUCTS:", res.data);
        setProducts(res.data);
      })
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);


  // ======================
  // 2. FUNCIÓN: Buscar restaurantes por producto
  // ======================
  const handleSearch = async () => {

    if (!searchTerm.trim()) {
      setSearchError("Ingresa un nombre de producto para buscar.");
      setFoundRestaurants([]);
      return;
    }
    
    setSearchLoading(true);
    setSearchError('');
    
    try {
      const restaurants = await getRestaurantsByProductName(searchTerm.trim());
      setFoundRestaurants(restaurants);
    } catch (error) {
      console.error("Error al buscar restaurantes por producto:", error);
      setSearchError("Ocurrió un error al buscar.");
      setFoundRestaurants([]);
    } finally {
      setSearchLoading(false);
    }
  };


  // ======================
  // 3. FUNCIÓN: Buscar productos por restaurante + categoría
  // ======================
  const handleFilterProducts = async () => {

    if (!restaurantInput.trim() || !categoryInput.trim()) {
      setFilterError("Debes ingresar restaurante y categoría.");
      setFilteredProducts([]);
      return;
    }

    setFilterLoading(true);
    setFilterError('');

    try {
      const products = await getProductsByRestaurantAndCategory(
        restaurantInput.trim(),
        categoryInput.trim()
      );

      setFilteredProducts(products);
    } catch (error) {
      console.error("Error al filtrar productos:", error);
      setFilterError("No se encontraron productos para esos datos.");
      setFilteredProducts([]);
    } finally {
      setFilterLoading(false);
    }
  };



  // ======================
  // RENDER
  // ======================
  return (
    <Box sx={{ padding: 4 }}>
      
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Catálogo de Productos
      </Typography>



      {/* ================================================== */}
      {/* BÚSQUEDA 1: RESTAURANTES por PRODUCTO */}
      {/* ================================================== */}
      <Box sx={{ mb: 5, p: 3, border: '1px solid #ccc', borderRadius: 2, background: '#f9f9f9' }}>
        
        <Typography variant="h6" sx={{ mb: 2 ,color: '#000000ff' }}>
          Buscar Restaurantes por Producto
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField 
              label="Nombre del Producto" 
              slotProps={{inputLabel:{style:{color: '#000'}},input: { sx: { color: "#000" } }}}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              disabled={searchLoading}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button 
              variant="contained" 
              onClick={handleSearch}
              disabled={searchLoading}
              fullWidth
              sx={{ height: '56px' }}
            >
              {searchLoading ? <CircularProgress size={24} color="inherit" /> : 'Buscar'}
            </Button>
          </Grid>
        </Grid>

        {/* Errores */}
        {searchError && <Typography color="error" sx={{ mt: 2 }}>{searchError}</Typography>}

        {/* Resultados */}
        {!searchLoading && foundRestaurants.length > 0 && (
          <Box sx={{ mt: 2, p: 2, borderTop: '1px dashed #ddd' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' , color: '#000' }}>
              Disponible en:
            </Typography>
            <Typography color="#000"> 
              {foundRestaurants.map(r => r.restaurantName).join(' • ')}
            </Typography>
          </Box>
        )}

      </Box>



      {/* ================================================== */}
      {/* BÚSQUEDA 2: PRODUCTOS por RESTAURANTE + CATEGORÍA */}
      {/* ================================================== */}
      <Box sx={{ mb: 5, p: 3, border: '1px solid #ccc', borderRadius: 2, background: '#f0f8ff' }}>

        <Typography variant="h6" sx={{ mb: 2 ,color: '#000000ff' }}>
          Buscar Productos por Restaurante y Categoría
        </Typography>

        <Grid container spacing={2}>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre del Restaurante"
              slotProps={{inputLabel:{style:{color: '#000'}},input: { sx: { color: "#000" } }}}
              fullWidth
              value={restaurantInput}
              onChange={(e) => setRestaurantInput(e.target.value)}
              disabled={filterLoading}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre de la Categoría"
              slotProps={{inputLabel:{style:{color: '#000'}},input: { sx: { color: "#000" } }}}
              fullWidth
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              disabled={filterLoading}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleFilterProducts}
              disabled={filterLoading}
              sx={{ height: '56px' }}
            >
              {filterLoading ? <CircularProgress size={24} color="inherit" /> : 'Buscar Productos'}
            </Button>
          </Grid>

        </Grid>

        {/* Errores */}
        {filterError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {filterError}
          </Typography>
        )}

        {/* Resultados */}
        {!filterLoading && filteredProducts.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 , color: '#000'}}>
              Productos encontrados:
            </Typography>

            <Grid container spacing={2}>
              {filteredProducts.map((prod) => (
                <Grid item xs={12} sm={6} md={4} key={prod.id}>
                  <ProductCard product={prod} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

      </Box>


      {/* ================================================== */}
      {/* RENDER GENERAL DE TODOS LOS PRODUCTOS */}
      {/* ================================================== */}
      {products.length === 0 ? (
        <Typography>No hay productos disponibles.</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      )}

    </Box>
  );
}



