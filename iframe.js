document.addEventListener('DOMContentLoaded', function() {
    const liveUurls = [
        'https://www.youtube.com/live/5yx6BWlEVcY?si=ebplKrv07gmWR-mv',
        'https://www.youtube.com/live/rUxyKA_-grg?si=94qsl5CFsnun_ukC',
        'https://www.youtube.com/live/jfKfPfyJRdk?si=7Q04P0ves89HW2cv',
        'https://www.youtube.com/live/S_MOd40zlYU?si=PaM8mr_TM4VHd_gn',
        'https://www.youtube.com/live/wDA4kdgC0bc?si=ubfq6loGFcKXhA52',
        'https://www.youtube.com/live/qH3fETPsqXU?si=9dZWMZe33X_dFiAe',
        'https://www.youtube.com/live/wkhLHTmS_GI?si=9_BA1Dv4HLj3Xqeg'
    ];

    // Load the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Function to create a YouTube player for each video
    function createPlayer(videoId, containerId) {
        // Check if YT is defined before creating the player
        if (typeof YT !== 'undefined' && typeof YT.Player !== 'undefined') {
            return new YT.Player(containerId, {
                height: '390',
                width: '640',
                videoId: videoId,
                playerVars: {
                    'playsinline': 1
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        } else {
            console.error('YouTube API not ready');
        }
    }

    // Function to handle player readiness
    function onPlayerReady(event) {
        // Optionally, you can start playing the first video
    }

    // Function to handle state changes
    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            // Handle video end if needed
        }
    }

    // Setup event listeners for each live URL
    liveUurls.forEach((url, index) => {
        const videoId = url.split('/live/')[1].split('?')[0]; // Extract video ID from URL

        // Create a list item for each video
        const li = document.createElement('li');
        li.textText = url; // Display the URL or any other identifier

        // Create a unique container for each player
        const containerId = `player${index}`;
        const playerContainer = document.createElement('div');
        playerContainer.id = containerId;
        li.appendChild(playerContainer); // Append the player container to the list item

        // Create the player for the video
        createPlayer(videoId, containerId);

        // Append the list item to the live stream list
        document.getElementById('liveStreamList').appendChild(li);
    });
});