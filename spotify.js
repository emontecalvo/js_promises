// In the spotify.js file there are two functions. 
// The getFromApi function uses the fetch API to 
// make requests to the Spotify API. It returns a promise, 
// which you can add a .then call to.


//endpoint link = https://developer.spotify.com/web-api/search-item/

// var getFromApi = function(endpoint, query) {
//     var url = 'https://api.spotify.com/v1/' + endpoint;

//     var queryString = Qs.stringify(query);
//     if (queryString) {
//         url += '?' + queryString;
//     };

//     return fetch(url).then(function(response) {
//         if (response.status < 200 || response.status >= 300) {
//             return Promise.reject(response.statusText);
//         }
//         return response.json();
//     });
// };


// var artist;

// var getArtist = function(name) {
//     var query = {
//         q: name,
//         limit: 1,
//         type: 'artist'
//     };
//     // Edit me!
//      return (getFromApi("search", query)).then(function(item) {
//         artist = item.artists.items[0];
//         //instead of return artist;
//         // return a request to the get related artists endpoint
//         var new_endpoint = `artists/${artist.id}/related-artists`;
//         return getFromApi(new_endpoint, query);
//      }).then(function(item) {
//         artist.related = item.artists;
//        // console.log(artist.related);
//         console.log("second request completed");
//         artist.related.map(function(artist) {
//             console.log(artist.name);
//         });
//         return artist;
//      })
//      .catch(function(err) {
//         console.log(err);
//      });


// };


// 2nd to last problem

// var artist;
// var trackS;

// var getArtist = function(name) {
//     // Edit me!
//     var query = {
//         q: name,
//         limit: 1,
//         type: 'artist'
//     };
//     return getFromApi("search", query).then(function(item) {
//         artist = item.artists.items[0];
//         return getFromApi(`artists/${artist.id}/related-artists`, query);
//     }).then(function(item) {
//         artist.related = item.artists;
//         return Promise.all(artist.related.map(function(artist) {
//             return getFromApi(`artists/${artist.id}/top-tracks`, {country: 'US'})
//         }));
//     }).then(function(items) {
//             trackS = items;
//             items.forEach(function(item, i) {artist.related[i].tracks = item.tracks});
//             console.log(artist);
//             return artist;
//     }).catch(function(err) {
//         console.log("error thrown: " + err);
//     });
// };


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
var trackS;

var getArtist = function(name) {
    // Edit me!
    var query = {
        q: name,
        limit: 1,
        type: 'artist'
    };
    return getFromApi("search", query).then(function(item) {
        artist = item.artists.items[0];
        return getFromApi(`artists/${artist.id}/related-artists`, query);
    }).then(function(item) {
        artist.related = item.artists;
        return Promise.all(artist.related.map(function(artist) {
            return getFromApi(`artists/${artist.id}/top-tracks`, {country: 'US'})
        }));
    }).then(function(items) {
            trackS = items;
            items.forEach(function(item, i) {artist.related[i].tracks = item.tracks});
            console.log(artist);
            return artist;
    }).catch(function(err) {
        console.log("error thrown: " + err);
    });
};






