const liveStreams = [
    { name: 'Lofi 1', url: 'https://www.youtube.com/live/5yx6BWlEVcY?si=ebplKrv07gmWR-mv' },
    { name: 'Stream 2', url: 'https://www.youtube.com/live/rUxyKA_-grg?si=94qsl5CFsnun_ukC' },
    { name: 'Stream 3', url: 'https://www.youtube.com/live/Yw8co39m3GQ?si=UnDXZzfOfGT3aWUV' },
    { name: 'Stream 4', url: 'https://www.youtube.com/live/S_MOd40zlYU?si=PaM8mr_TM4VHd_gn' },
    { name: 'Stream 6', url: 'https://www.youtube.com/live/qH3fETPsqXU?si=9dZWMZe33X_dFiAe' },
    { name: 'Stream 7', url: 'https://www.youtube.com/live/wkhLHTmS_GI?si=9_BA1Dv4HLj3Xqeg' },
    {url: 'https://www.youtube.com/live/_uMuuHk_KkQ?si=LoSo3lmZhpYXd6u0'},
    {name: 'lofi-girl anime', url: 'https://www.youtube.com/live/Na0w3Mz46GA?si=P0G5kwg55FCI2rS-'},
    {name: 'peaceful piano', url: 'https://www.youtube.com/live/4oStw0r33so?si=SMtw_Sm2JmWeAhOd'},

];

let player;
let playerReady = false; // Track if the player is ready
const apiKey = 'AIzaSyAx0qYkyxPKAE717-9My8dG5IBMK3gwJHQ'; // Replace with your YouTube Data API key

function onYouTubeIframeAPIReady() {
    // Create the player when the API is ready
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        playerVars: {
            'playsinline': 1, // Play inline on mobile
            'controls': 0, // Disable default controls
            'disablekb': 1, // Disable keyboard controls
            'modestbranding': 1, // Hide YouTube logo
            'showinfo': 0, // Hide video title and player actions (deprecated, may not work)
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
    console.log('Player is ready'); // Debugging message
    populateVideoList(); // Populate the video list when player is ready
}

function onPlayerStateChange(event) {
    // Handle state changes if needed
}

async function fetchVideoTitle(videoId) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.items.length > 0) {
            return data.items[0].snippet.title; // Return video title
        } else {
            return 'Unknown Title'; // Fallback title
        }
    } catch (error) {
        console.error('Error fetching video title:', error);
        return 'Error fetching title'; // Fallback title on error
    }
}

function loadVideo(url) {
    const videoId = url.split('/live/')[1].split('?')[0]; // Extract video ID
    console.log('Attempting to load video:', videoId); // Debugging message
    
    // Check if the player is ready
    if (playerReady) {
        player.loadVideoById(videoId); // Load the selected video
    } else {
        console.error('Player not ready'); // Log error if player is not ready
    }
}

function populateVideoList() {
    const videoItems = document.getElementById('videoItems');

    // Clear existing content
    videoItems.innerHTML = '';

    liveStreams.forEach(async (stream) => {
        console.log("stream: " + stream)
        const videoId = stream.url.split('/live/')[1].split('?')[0];
        const title = await fetchVideoTitle(videoId);
        const li = document.createElement('li');
        li.textContent = title;
        li.addEventListener('click', () => loadVideo(stream.url));
        videoItems.appendChild(li);
    });
}

const pauseButton = document.getElementById('pause');
const playButton = document.getElementById('play');
const volumeSlider = document.getElementById('volume-slider')
// Initially show the play button
playButton.style.display = 'block';
pauseButton.style.display = 'none';

// Add click event listener to the play button
playButton.addEventListener('click', function() {
    playButton.style.display = 'none';  // Hide play button
    pauseButton.style.display = 'block'; // Show pause button
    player.stopVideo()
    // Add any additional logic for play action here
});

// Add click event listener to the pause button
pauseButton.addEventListener('click', function() {
    pauseButton.style.display = 'none';  // Hide pause button
    playButton.style.display = 'block';   // Show play button
    player.playVideo()
    // Add any additional logic for pause action here
});

volumeSlider.addEventListener('input',function() {
    console.log("Volume changed to:", this.value);
    player.setVolume(this.value)
})

// Check if the YouTube API is loaded
if (typeof YT !== 'undefined' && typeof YT.Player !== 'undefined') {
    onYouTubeIframeAPIReady(); // Initialize the player immediately if the API is ready
} else {
    console.error('YouTube IFrame API is not loaded'); // Log error if API is not loaded
}