import axios from "axios";

export const API_URL = "http://localhost:5139/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

// 🔥 Interceptor: agrega token JWT si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ============================
   AUTH / LOGIN
============================ */

export async function login(credentials) {
  const res = await api.post("/authentication", credentials);
  return res.data; // token
}

/* ============================
   RESTAURANTES (CRUD Completo)
============================ */

export async function getRestaurants() {
  const res = await api.get("/restaurant");
  return res.data;
}

export async function getRestaurantByName(name) {
  const res = await api.get(`/restaurant/${name}`);
  return res.data;
}

export async function updateRestaurant(id, data) {
  // PUT api/restaurant/{restaurantId} (Protegido)
  const res = await api.put(`/restaurant/${id}`, data);
  return res.data;
}

export async function deleteRestaurant(email, passwordHash) {
  // DELETE api/restaurant/{email}/{passwordHash} (Protegido)
  const res = await api.delete(`/restaurant/${email}/${passwordHash}`);
  return res.data; // Retorna el mensaje de éxito del backend
}

/* ============================
   CATEGORÍAS (CRUD Completo)
============================ */

export async function getCategories() {
  const res = await api.get("/categories");
  return res.data;
}

export async function getCategoryById(id) {
  const res = await api.get(`/categories/${id}`);
  return res.data;
}

export async function createCategory(data) {
  // POST api/categories (Protegido)
  const res = await api.post("/categories", data);
  return res.data; 
}

export async function updateCategory(id, data) {
  // PUT api/categories/{categoryId} (Protegido)
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
}

export async function deleteCategory(id) {
  // DELETE api/categories/{categoryId} (Protegido)
  const res = await api.delete(`/categories/${id}`); 
  return res.data;
}

/* ============================
   PRODUCTOS (CRUD y GETs)
============================ */

export async function getProducts() {
  const res = await api.get("/products");
  return res.data;
}

export async function getProductById(id) {
  const res = await api.get(`/products/id/${id}`);
  return res.data;
}

export async function createProduct(data) {
  // POST api/products (Protegido)
  const res = await api.post("/products", data);
  return res.data;
}

export async function updateProduct(id, data) {
  // PUT api/products/{id} (Protegido)
  const res = await api.put(`/products/${id}`, data);
  return res.data;
}

export async function deleteProduct(id) {
  // DELETE api/products/{id} (Protegido)
  await api.delete(`/products/${id}`);
}

/* ============================
   BÚSQUEDAS ADICIONALES Y PRECIOS
============================ */

export async function getMenuByRestaurantName(name) {
  const res = await api.get(`/restaurant/${name}/menu`);
  return res.data;
}

export async function getRestaurantsByProductName(productName) {
  // GET api/restaurant/product/{productName}
  const res = await api.get(`/restaurant/product/${productName}`);
  return res.data;
}

export async function getProductsByRestaurantAndCategory(restaurantName, categoryName) {
  // GET api/restaurant/{restaurantName}/category/{categoryName}/products
  const res = await api.get(`/restaurant/${restaurantName}/category/${categoryName}/products`);
  return res.data;
}

export async function getRecommendedProducts() {
  const res = await api.get("/products/recommended");
  return res.data;
}

export async function getHappyHourByRestaurant(restaurantName) {
  const res = await api.get(`/products/${restaurantName}/happyhour`);
  return res.data;
}
export async function getHappyHourStatus(restaurantId) {
  const res = await api.get(`/products/${restaurantId}/happyhour-status`);
  return res.data.happyHourEnabled;
}

export async function getDiscountedByRestaurant(restaurantName) {
  const res = await api.get(`/products/${restaurantName}/discounted`);
  return res.data;
}

// ⚙️ Funciones de administración (PUTs)
export async function setHappyHour(restaurantId, enabled) {
  const res = await api.put(
    `/products/${restaurantId}/happyhour/${enabled}`
  );
  return res.data;
}

export async function updateDiscount(productId, percentage) {
  const res = await api.put(`/products/${productId}/discount/${percentage}`);
  return res.data;
}

export async function increasePrices(restaurantId, percentage) {
  const res = await api.put(
    `/products/increase-prices/${restaurantId}?percentage=${percentage}`
  );
  return res.data;
}




