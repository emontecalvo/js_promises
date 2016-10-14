// In the spotify.js file there are two functions. 
// The getFromApi function uses the fetch API to 
// make requests to the Spotify API. It returns a promise, 
// which you can add a .then call to.


//endpoint link = https://developer.spotify.com/web-api/search-item/

var getFromApi = function(endpoint, query) {
    var url = 'https://api.spotify.com/v1/' + endpoint;

    var queryString = Qs.stringify(query);
    if (queryString) {
        url += '?' + queryString;
    };

    return fetch(url).then(function(response) {
        if (response.status < 200 || response.status >= 300) {
            return Promise.reject(response.statusText);
        }
        return response.json();
    });
};


var artist;

var getArtist = function(name) {
    var query = {
        q: name,
        limit: 1,
        type: 'artist'
    };
    // Edit me!
     return (getFromApi("search", query)).then(function(item) {
        artist = item.artists.items[0];
        //instead of return artist;
        // return a request to the get related artists endpoint
        var new_endpoint = `artists/${artist.id}/related-artists`;
        return getFromApi(new_endpoint, query);
     }).then(function(item) {
        artist.related = item.artists;
        console.log("second request completed");
        return artist;
     })
     .catch(function(err) {
        console.log(err);
     });


};


// fetch('http://example.com/first-endpoint')
// .then(function() {
//     console.log('First request has completed');
//     return fetch('http://example.com/second-endpoint');
// })
// .then(function() {
//     console.log('Second request has completed');
// });



