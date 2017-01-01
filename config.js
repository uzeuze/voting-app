let API_URL = 'http://localhost:3000/api';
let URL = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://polls-uzeuze.herokuapp.com';
  URL = 'https://polls-uzeuze.herokuapp.com';
}

export { API_URL, URL };
