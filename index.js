const IGDB_SEARCH_URL = 'https://api-endpoint.igdb.com/games/search';

function getDataFromApi(searchTerm, callback) {
  
  const settings = {
    url: IGDB_SEARCH_URL,
    headers: {
      'user-key': '15870042b514b393825fc09f6b04056b',
        'Accept': 'application/json'
    },
    data: {
      q: `${searchTerm} in:name`,
      per_page: 5,
      part: 'snippet',
      key: '15870042b514b393825fc09f6b04056b',
      Accept: 'application/json'
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
  };

  $.ajax(settings);
}


function renderResult(thumbnail_url, video_url) {
  return `
    <div>
      <a href="https://www.youtube.com/watch?v=${video_url}"><img src="${thumbnail_url}"/> </a>
    </div>
  `;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item.snippet.thumbnails.default.url, item.id.videoId));
  
  $('.js-search-results').prop('hidden', false);
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);
