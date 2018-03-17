const GIANTBOMB_SEARCH_URL = 'http://www.giantbomb.com/api/search'; 

function getDataFromApi(searchTerm, callback) {
  
  const settings = {
    url: GIANTBOMB_SEARCH_URL,
    data: {
      api_key: '5ad6937d0f0a1d369741b32af556a8e0e0db4ba8',
      format: 'json',
      query: `"${searchTerm}"`,
      resources: 'game'
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
  };

  $.ajax(settings);
}

function renderResult(name, icon_url) {
  return `
    <div>
      ${name} <img src="${icon_url}"/>
    </div>
  `;
}

function displayGiantBombSearchData(data) {
  const results = data.items.map((item, index) => renderResult(results.name, results.image.icon_url));
}


function watchSubmit() {
  $('.js-search-form').submit(function(event) {
      event.preventDefault();
      const userInput = $(this).find('#js-query');
      const query =  userInput.val();
      userInput.val("");
      getDataFromApi(query, displayGiantBombSearchData);
      });
}






$(watchSubmit);
