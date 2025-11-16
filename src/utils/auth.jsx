// Guarda token y rol
export function loginHost(token) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", "host");
}

// Para entrar como invitado
export function loginGuest() {
  localStorage.removeItem("token");
  localStorage.setItem("role", "guest");
}

// Logout general
export function logout() {
  localStorage.clear();
}

// 🔑 Función de utilidad para proteger rutas
export function getToken() {
  return localStorage.getItem("token");
}

export function isHost() {
  return localStorage.getItem("role") === "host";
}

export function isGuest() {
  const role = localStorage.getItem("role");
  return role === "guest" || !role;
}