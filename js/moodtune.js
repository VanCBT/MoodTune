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
  try {
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

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  // Store the token and also calculate the expiry time
  token = data.access_token;
  tokenExpiryTime = new Date().getTime() + (data.expires_in * 3600); // this was the expires_in response when tested in postman
  return token;
} catch (error) {
  console.error('Error fetching token:', error);
  throw error;
  }
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

// Collect and store the user answers to the questions
let userResponses = {
  currentMood: '',
  desiredMood: '',
  favoritePart: [],
  genres: []
};

// nextButtons.forEach((button, index) => {
//   button.onclick = function(event) {
//      //event.preventDefault(); // Prevent form submission
//      forms[index].style.right = "-145%";
//      forms[index].style.left = "unset";
//      forms[index].classList.remove('active');

//     if (forms[index + 1]) {
//        forms[index + 1].classList.add('active');
//     }
//   };
// });


// store answer to question 1
Next1.onclick = function(event) {
  event.preventDefault();
  userResponses.currentMood = document.querySelector('input[name="currentMood"]:checked').value;
};

// store answer to question 2
Next2.onclick = function(event) {
  event.preventDefault();
  userResponses.desiredMood = document.querySelector('input[name="desiredMood"]:checked').value;
};

// store answer to question 3
Next3.onclick = function(event) {
  event.preventDefault();
  userResponses.favoritePart = document.querySelector('input[name="favoritePart"]:checked').value;
};

//store answer to question 4
Next4.onclick= async function(event) {
  event.preventDefault();
  userResponses.genres = Array.from(document.querySelectorAll('input[name="genres"]:checked')).map(checkbox => checkbox.value);
  const recommendations = await getRecommendations(userResponses.desiredMood, userResponses.favoritePart, userResponses.genres);

  const songSelect = document.getElementById('songs');
  songSelect.innerHTML = ''; // clear the existing songs to populate recommendations to select
  recommendations.forEach(song => {
    const option = document.createElement('option');
    option.value = `${song.name}, ${song.artists[0].name}`; //we need to populate 5?
    option.textContent = `${song.name}, ${song.artists[0].name}`;
    songSelect.appendChild(option);
  });
}
async function getRecommendations(mood, favoritePart, genres) {
  const token = await getToken();
  const seed_genres = genres.join(',');
  
  // Map mood to valence and energy parameters
  const moodParams = getMoodParams(mood);
  
  // Map favoritePart to audio features
  const partParams = getPartParams(favoritePart);

  const params = new URLSearchParams({
    limit: 5,
    seed_genres: seed_genres,
    ...moodParams,
    ...partParams
  });

  const response = await fetch(`https://api.spotify.com/v1/recommendations?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  return data.tracks;
}

function getMoodParams(mood) {
  // Map mood to valence and energy values
  const moodMap = {
    'happy': { target_valence: 0.8, target_energy: 0.8 },
    'sad': { target_valence: 0.2, target_energy: 0.3 },
    'energetic': { target_valence: 0.6, target_energy: 0.9 },
    'calm': { target_valence: 0.5, target_energy: 0.3 }
  };
  return moodMap[mood] || {};
}

function getPartParams(favoritePart) {
  // Map favorite part to relevant audio features
  const partMap = {
    'lyrics': { target_speechiness: 0.7 },
    'melody': { target_instrumentalness: 0.7 },
    'rhythm': { target_danceability: 0.7 }
  };
  return partMap[favoritePart] || {};
}





