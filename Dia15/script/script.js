const clientId = 'i3iVyVhYs8Fe7sCm08ILfSwWANBOvZYXNYKvz1pLzEsk74ZD8R';
const clientSecret = 'SZpQ6DcjYFSDew7IV0LszaAXmOvrOqhDC2N6JHtV';

// Variable para almacenar el token
let accessToken = null;
let tokenExpiration = null;

async function getAccessToken() {
  // Verificar si el token actual sigue siendo válido
  if (accessToken && tokenExpiration && Date.now() < tokenExpiration) {
    return accessToken;
  }
  
  // Si no hay token o ha expirado, obtener uno nuevo
  try {
    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    accessToken = data.access_token;
    
    // Establecer la expiración (normalmente 3600 segundos = 1 hora)
    // Restamos 60 segundos para tener margen de seguridad
    const expiresIn = data.expires_in || 3600;
    tokenExpiration = Date.now() + (expiresIn - 60) * 1000;
    
    return accessToken;
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error);
    throw error;
  }
}

// Ejemplo de función para hacer una petición a la API
async function fetchFromPetfinder(endpoint) {
  const token = await getAccessToken();
  
  const response = await fetch(`https://api.petfinder.com/v2/${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    // Si recibimos un 401, intentamos renovar el token y volver a intentar
    if (response.status === 401) {
      // Forzar la renovación del token
      accessToken = null;
      return fetchFromPetfinder(endpoint);
    }
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Ejemplo de uso
async function getAnimals() {
  try {
    const data = await fetchFromPetfinder('animals?type=dog&page=1');
    console.log(data);
  } catch (error) {
    console.error('Error al obtener animales:', error);
  }
}