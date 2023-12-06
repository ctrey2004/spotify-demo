$(document).ready(function() {
    // Helper Function to Extract Access Token from URL
    const getUrlParameter = (sParam) => {
        let sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
            sParameterName,
            i;
        let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
        sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    // Get Access Token
    const accessToken = getUrlParameter('access_token');

    // Authorize with Spotify (if needed)
    // *************** REPLACE THESE VALUES! *************************
    let client_id = '1ec7fd9573b54009b2fb16c6775d1231';
    // Use the following site to convert your regular url to the encoded version:
    // https://www.url-encode-decode.com/
    let redirect_uri = 'https%3A%2F%2Fctrey2004.github.io%2Fspotify-demo'; // GitHub Pages URL or whatever your public url to this app is
    // *************** END *************************

    const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
    // Don't authorize if we have an access token already
    if(accessToken == null || accessToken == "" || accessToken == undefined){
      window.location.replace(redirect);
    }

    // Function to Load Playlist from Spotify
    const loadSpotifyPlaylist = () => {
        $.ajax({
            url: `https://api.spotify.com/v1/playlists/40WhYFDkKVUBwKPzVZOdPQ`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
                // Embed the playlist into the webpage
                let playlistEmbedCode = `<iframe src="https://open.spotify.com/embed/playlist/40WhYFDkKVUBwKPzVZOdPQ" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
                $('#spotify-playlist-container').html(playlistEmbedCode);
            }
        });
    };

    // Load the Spotify Playlist when the page is ready
    loadSpotifyPlaylist();
});
