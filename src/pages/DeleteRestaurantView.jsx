// src/pages/DeleteRestaurantView.jsx

import { useEffect } from "react";
import Swal from "sweetalert2";
import { deleteRestaurant } from "../services/api"; 
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function DeleteRestaurantView() {
  const nav = useNavigate();

  useEffect(() => {
    // La lógica se ejecuta al cargar la página
    handleAutoDelete();
  }, []);

  async function handleAutoDelete() {
    // 1. CONFIRMACIÓN (Pedir credenciales dentro del pop-up)
    const { value: formValues } = await Swal.fire({
      title: "Eliminar Restaurante Permanentemente",
      text: "Debes confirmar tu Email y Contraseña. ¡Esta acción es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar mi cuenta',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      html: `
        <input id="swal-email" class="swal2-input" placeholder="Email del Restaurante">
        <input id="swal-pass" type="password" class="swal2-input" placeholder="Contraseña">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const email = document.getElementById("swal-email").value;
        const passwordHash = document.getElementById("swal-pass").value;
        if (!email || !passwordHash) {
          Swal.showValidationMessage('Email y Contraseña son requeridos.');
          return false;
        }
        return { email, passwordHash };
      }
    });

    if (!formValues) {
      // El usuario canceló
      nav('/restaurants');
      return;
    }

    try {
      // 2. LLAMADA API (DELETE api/restaurant/{email}/{passwordHash})
      const response = await deleteRestaurant(formValues.email, formValues.passwordHash);

      // 3. ÉXITO
      logout(); // Cierra la sesión inmediatamente
      Swal.fire(
        '¡Eliminado!',
        response, // Muestra el mensaje de éxito del backend
        'success'
      ).then(() => nav('/')); // Vuelve a Home

    } catch (error) {
      // 4. ERROR (Credenciales inválidas o error de servidor)
      let errorText = "Error al eliminar. Verifica tus credenciales.";
      
      if (error.response && error.response.status === 401) {
          errorText = "Credenciales inválidas. Inténtalo de nuevo.";
      } else if (error.response && error.response.data && typeof error.response.data === 'string') {
          errorText = error.response.data;
      }
      
      Swal.fire(
        '¡Error!',
        errorText,
        'error'
      ).then(() => nav('/restaurants')); // Regresar a la lista de restaurantes
    }
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p>Procesando la solicitud de eliminación...</p>
      {/* Muestra un spinner o mensaje de carga mientras se ejecuta el useEffect */}
    </div>
  );
}