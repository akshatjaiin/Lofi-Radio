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

    // Initialize the player variable
    var player;
    var isPlaying = false; // State to track if a video is currently playing

    // Create a function to set up the player
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: '', // Initially empty
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    // Function to handle player readiness
    function onPlayerReady(event) {
        // Optionally, you can start playing the first video
    }

    // Function to handle state changes
    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            isPlaying = false; // Video has ended
            enableVideoLinks(); // Re-enable video links
        }
    }

    // Function to load a specific video by URL
    function loadVideo(url) {
        const videoId = url.split('/live/')[1].split('?')[0]; // Extract video ID from URL
        player.loadVideoById(videoId); // Load the video in the player
        isPlaying = true; // Set playing state to true
        disableVideoLinks(); // Disable video links
    }

    // Function to disable video links
    function disableVideoLinks() {
        const listItems = document.querySelectorAll('#liveStreamList li');
        listItems.forEach(li => {
            li.style.pointerEvents = 'none'; // Disable clicking
            li.style.opacity = '0.5'; // Dim the list items
        });
    }

    // Function to enable video links
    function enableVideoLinks() {
        const listItems = document.querySelectorAll('#liveStreamList li');
        listItems.forEach(li => {
            li.style.pointerEvents = 'auto'; // Enable clicking
            li.style.opacity = '1'; // Restore opacity
        });
    }

    // Setup event listeners for each live URL
    liveUurls.forEach(url => {
        const li = document.createElement('li');
        li.textContent = url; // Display the URL or any other identifier
        li.addEventListener('click', () => loadVideo(url)); // Load video on click
        document.getElementById('liveStreamList').appendChild(li);
    });
});