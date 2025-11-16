import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import CreateRestaurant from "./pages/CreateRestaurant";
import Products from "./pages/Products";
import RestaurantMenu from "./pages/RestaurantMenu";
import { getToken } from "./utils/auth.jsx";

// Importar todos los componentes de administración necesarios
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct"; 
import CategoryList from "./pages/CategoryList"; 
import CreateCategory from "./pages/CreateCategory";
import UpdateCategory from "./pages/UpdateCategory";
import UpdateRestaurant from "./pages/UpdateRestaurant"; 
import DeleteRestaurantView from "./pages/DeleteRestaurantView"; 
import PriceAdjuster from "./pages/PriceAdjuster"; 


// 🔒 Rutas privadas: solo si hay token
function PrivateRoute({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* =======================
            RUTAS PÚBLICAS (GETs)
        ======================= */}
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:restaurantName/menu" element={<RestaurantMenu />} />
        <Route path="/products" element={<Products />} /> 
        
        {/* =======================
            RUTAS PRIVADAS (ADMIN)
        ======================= */}
        
        {/* Restaurantes CRUD */}
        <Route
          path="/restaurants/create"
          element={
            <PrivateRoute>
              <CreateRestaurant />
            </PrivateRoute>
          }
        />
        <Route
          path="/restaurants/update/:restaurantId" // Edición de Restaurante
          element={
            <PrivateRoute>
              <UpdateRestaurant />
            </PrivateRoute>
          }
        />
        <Route
          path="/restaurants/delete" // Auto-Eliminación de Restaurante
          element={
            <PrivateRoute>
              <DeleteRestaurantView />
            </PrivateRoute>
          }
        />

        {/* Productos CRUD y Herramientas */}
        <Route
          path="/products/create"
          element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/update/:productId"
          element={
            <PrivateRoute>
              <UpdateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/adjust-prices" // Ruta para las herramientas masivas
          element={
            <PrivateRoute>
              <PriceAdjuster />
            </PrivateRoute>
          }
        />


        {/* Categorías CRUD */}
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <CategoryList />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories/create"
          element={
            <PrivateRoute>
              <CreateCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories/update/:categoryId"
          element={
            <PrivateRoute>
              <UpdateCategory />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}



