const clientId = 'i3iVyVhYs8Fe7sCm08ILfSwWANBOvZYXNYKvz1pLzEsk74ZD8R';
const clientSecret = 'SZpQ6DcjYFSDew7IV0LszaAXmOvrOqhDC2N6JHtV';

async function getAccesToken(){
  const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method:'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body: `gran_type=client_credentials&client_id=${clientId}&client_secret${clientSecret}`
  });
  const data = await response.json();
  return data.access_token;
  
}