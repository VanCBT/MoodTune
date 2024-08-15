const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let token = null;
let tokenExpiryTime = null;

async function getToken() {
  // Check to see if we already have a valid token 
  const currentTime = new Date().getTime();
  if (token && tokenExpiryTime && currentTime < tokenExpiryTime) {
    return token; // Token is still valid return it
  }

  // if the token is expired or not available, then we need to fetch a new one
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
    },
  });

  const data = await response.json();

  // Store the token and also calculate the expiry time
  token = data.access_token;
  tokenExpiryTime = new Date().getTime() + (data.expires_in * 3600); // this was the expires_in response when tested in postman

  return token;
}

const Form1 = document.getElementById("Form1");
const Form2 = document.getElementById("Form2");
const Form3 = document.getElementById("Form3");
const Form4 = document.getElementById("Form4");
const Form5 = document.getElementById("Form5");

const Next1 = document.getElementById("next1");
const Next2 = document.getElementById("next2");
const Next3 = document.getElementById("next3");
const Next4 = document.getElementById("next4");

const forms = document.querySelectorAll('fieldset');
const nextButtons = document.querySelectorAll('.next-question');

nextButtons.forEach((button, index) => {
  button.onclick = function(event) {
    event.preventDefault(); // Prevent form submission
     forms[index].style.right = "-145%";
     forms[index].style.left = "unset";
     forms[index].classList.remove('active');

    if (forms[index + 1]) {
       forms[index + 1].classList.add('active');
    }
  };
});