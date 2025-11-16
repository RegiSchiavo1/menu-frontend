// src/pages/UpdateRestaurant.jsx

import { useState, useEffect } from "react";
import { updateRestaurant, getRestaurantByName } from "../services/api"; 
import Swal from "sweetalert2";
import { Container, TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; 

export default function UpdateRestaurant() {
  const nav = useNavigate();
  // Nota: Tu ruta de App.jsx usa :restaurantId, pero tu GET es por nombre.
  // Vamos a usar el ID para el PUT, pero usaremos un GET por nombre si necesitamos precargar.
  const { restaurantId } = useParams(); // ID pasado por la URL para el PUT
  
  // Usaremos un estado para almacenar el ID del restaurante cargado (necesario para el PUT)
  const [currentRestaurantId, setCurrentRestaurantId] = useState(null);
  const [form, setForm] = useState(null); 
  const [loading, setLoading] = useState(true);

  // 1. CARGA INICIAL DE DATOS (Usando GET por ID o Nombre si no tienes el ID)
  // *Asumo que pasarás el ID a esta vista, pero si no, tendrías que obtenerlo del Host.*
  useEffect(() => {
    async function fetchRestaurant() {
      if (!restaurantId) {
          // Opción de fallback si la URL no tiene el ID.
          Swal.fire('Error', 'ID del restaurante no encontrado en la URL.', 'error');
          setLoading(false);
          return;
      }
      
      try {
        // En un escenario real, usarías un endpoint GET /restaurant/{id}.
        // Como no tenemos ese endpoint en el controller compartido, cargaremos un dato simulado o usaremos otro GET si es posible.
        // **Usaremos el ID para la carga, asumiendo que tienes una forma de obtener los datos.**

        // Por simplicidad, aquí usaremos getRestaurantByName simulando que obtenemos los datos
        // Si tu ID del restaurante no es el nombre, tendrías que crear un GET /restaurant/id/{id} en tu backend.
        // Ya que el GET existe por nombre, vamos a buscar el restaurante por el nombre que nos interesa (esto puede requerir un ajuste en la navegación).
        
        // --- SIMULACIÓN DE CARGA (AJUSTAR SEGÚN TU FLUJO REAL) ---
        // Buscamos un restaurante de ejemplo para cargar el formulario, ya que el ID no siempre es el nombre.
        // **Para que esto funcione, la URL debe pasar un nombre válido si el GET es por nombre.**
        
        // Mejor asumiremos que el ID es suficiente y cargaremos datos ficticios si la API falla.
        const mockData = { name: "Restaurant Ficticio", address: "Av. Falsa 123", phoneNumber: "555-1234", email: "ejemplo@host.com" };

        // Si tienes el endpoint GET /restaurant/{restaurantId} en tu backend, úsalo aquí:
        // const data = await getRestaurantById(restaurantId); 
        // ------------------------------------------------------------------

        setForm({
          name: mockData.name,
          address: mockData.address,
          phoneNumber: mockData.phoneNumber,
          email: mockData.email,
          password: "" // La contraseña NUNCA debe cargarse
        });
        setCurrentRestaurantId(parseInt(restaurantId));

      } catch (error) {
        Swal.fire('Error al cargar', 'No se pudieron cargar los datos del restaurante para edición.', 'error');
        nav('/restaurants');
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurant();
  }, [restaurantId, nav]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 2. MANEJO DEL SUBMIT CON SWEETALERT2 (PUT api/restaurant/{id})
  async function handleSubmit() {
    if (!form || !currentRestaurantId) return;

    // El DTO de C# espera 'Password' aunque no se use para la actualización en sí,
    // y espera los campos del CreateAndUpdateRestaurantDto.
    const dataToSend = { ...form };

    try {
      const updatedRestaurant = await updateRestaurant(currentRestaurantId, dataToSend);

      // NOTIFICACIÓN DE ÉXITO
      Swal.fire({
          title: "¡Restaurante Actualizado! 🍾",
          text: `"${updatedRestaurant.name}" se modificó correctamente.`,
          icon: "success",
          confirmButtonText: "OK"
      }).then(() => nav("/restaurants")); 
      
    } catch (error) {
      // MANEJO DE ERRORES DEL BACKEND
      let errorText = "No se pudo actualizar el restaurante.";
      
      if (error.response) {
          if (error.response.status === 404) {
              errorText = `Restaurante ID ${currentRestaurantId} no encontrado.`;
          } else if (error.response.data && typeof error.response.data === 'string') {
               errorText = error.response.data; 
          } else if (error.response.status === 400 && error.response.data) {
               errorText = "Error de validación: " + JSON.stringify(error.response.data);
          }
      }
      
      Swal.fire({
          title: "Error",
          text: errorText,
          icon: "error",
          confirmButtonText: "Entendido"
      });
    }
  }

  if (loading || form === null) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando datos para edición...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Editar Restaurante (ID: {currentRestaurantId})
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre" name="name" value={form.name} onChange={handleChange} />
        <TextField label="Dirección" name="address" value={form.address} onChange={handleChange} />
        <TextField label="Teléfono" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} disabled /> 
        {/* El email no debería cambiarse fácilmente */}
        <TextField 
            label="Contraseña (dejar vacío para no cambiar)" 
            name="password" 
            type="password" 
            value={form.password} 
            onChange={handleChange} 
        />
        
        <Button variant="contained" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Box>
    </Container>
  );
}