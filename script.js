'use strict';

const apiKey = 'z3RWs3v6IJEhuARsNBy9iBly6LGBnnB1rUNGbugv'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <h4>Direction: ${responseJson.data[i].directionsInfo}</h4>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}' target='_blank'>Click for Website</a>
      </li>`
    )};
 
  $('#results').removeClass('hidden');
};

function getParksData(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    limit: maxResults,
    stateCode: query
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParksData(searchTerm, maxResults);
  });
}

$(watchForm);