const api = 'AIzaSyAx0qYkyxPKAE717-9My8dG5IBMK3gwJHQ'
let player;
let playerReady = false; // Track if the player is ready
const apiKey = api; // Replace with your YouTube Data API key

// Sample live stream data
const liveStreams = [
    { name: 'Lofi 1', url: 'https://www.youtube.com/live/5yx6BWlEVcY?si=ebplKrv07gmWR-mv' },
    { name: 'Stream 2', url: 'https://www.youtube.com/live/rUxyKA_-grg?si=94qsl5CFsnun_ukC' },
    { name: 'Stream 3', url: 'https://www.youtube.com/live/Yw8co39m3GQ?si=UnDXZzfOfGT3aWUV' },
    { name: 'Stream 4', url: 'https://www.youtube.com/live/S_MOd40zlYU?si=PaM8mr_TM4VHd_gn' },
    { name: 'Stream 6', url: 'https://www.youtube.com/live/qH3fETPsqXU?si=9dZWMZe33X_dFiAe' },
    { name: 'Stream 7', url: 'https://www.youtube.com/live/wkhLHTmS_GI?si=9_BA1Dv4HLj3Xqeg' },
    { name: 'Lofi Girl Anime', url: 'https://www.youtube.com/live/Na0w3Mz46GA?si=P0G5kwg55FCI2rS-' },
    { name: 'Peaceful Piano', url: 'https://www.youtube.com/live/4oStw0r33so?si=SMtw_Sm2JmWeAhOd' },
];

let currentVideoIndex = 0; // Track the current video index

function onYouTubeIframeAPIReady() {
    // Create the player when the API is ready
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        playerVars: {
            'playsinline': 1,
            'controls': 0, // Disable default controls
            'disablekb': 1, // Disable keyboard controls
            'modestbranding': 1, // Hide YouTube logo
            'rel': 0, // Disable related videos
            'iv_load_policy': 3, // Disable video annotations
            'fs': 0 // Disable fullscreen button
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    playerReady = true; // Set the player as ready
    console.log('Player is ready');
    loadVideo(currentVideoIndex); // Load the first video
}

function onPlayerStateChange(event) {
    // Handle state changes if needed
}

// Load video by index
function loadVideo(index) {
    if (index >= 0 && index < liveStreams.length) {
        const videoUrl = liveStreams[index].url;
        const videoId = videoUrl.split('/live/')[1].split('?')[0]; // Extract video ID
        player.loadVideoById(videoId); // Load the selected video
        console.log(`Loading video: ${liveStreams[index].name}`);
    }
}

// Play/Pause button functionality
const playPauseButton = document.getElementById('playPauseButton');
playPauseButton.addEventListener('click', () => {
    if (playerReady) {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.pauseVideo();
            playPauseButton.src = 'svgs/play.svg'; // Change to play icon
        } else {
            player.playVideo();
            playPauseButton.src = 'svgs/pause.svg'; // Change to pause icon
        }
    }
});

// Previous button functionality
const previousButton = document.getElementById('previousButton');
previousButton.addEventListener('click', () => {
    if (currentVideoIndex > 0) {
        currentVideoIndex--; // Decrement the index
        loadVideo(currentVideoIndex); // Load the previous video
    }
});

// Next button functionality
const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', () => {
    if (currentVideoIndex < liveStreams.length - 1) {
        currentVideoIndex++; // Increment the index
        loadVideo(currentVideoIndex); // Load the next video
    }
});

// Volume control functionality
const volumeButton = document.getElementById('volumeButton');
volumeButton.addEventListener('click', () => {
    // Toggle volume on/off or implement volume slider
    console.log('Volume button clicked');
    // You can implement logic to change volume, e.g., mute/unmute
});