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
let playerReady = false;
let currentVideoIndex = 0; // Track the current video index
const apiKey = 'AIzaSyAx0qYkyxPKAE717-9My8dG5IBMK3gwJHQ';

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        playerVars: {
            'playsinline': 1,          // Play the video inline on mobile
            'controls': 0,             // Hide the player controls
            'disablekb': 1,           // Disable keyboard controls
            'modestbranding': 1,       // Minimize YouTube branding
            'showinfo': 0,            // Do not show video title and uploader before the video starts
            'rel': 0,                  // Do not show related videos at the end
            'iv_load_policy': 3,       // Do not show video annotations
            'fs': 0,                   // Disable fullscreen button
            'cc_load_policy': 0,       // Disable closed captions by default
            'autoplay': 1,             // Autoplay the video (optional)
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
function onPlayerReady(event) {
    playerReady = true;
    populateVideoList();
    loadVideo(liveStreams[currentVideoIndex].url); // Load the first video
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        // Video is playing
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
    } else {
        // Video is not playing
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
    }
}

async function fetchVideoTitle(videoId) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.items.length > 0) {
            return data.items[0].snippet.title;
        } else {
            return 'Unknown Title';
        }
    } catch (error) {
        console.error('Error fetching video title:', error);
        return 'Error fetching title';
    }
}

function loadVideo(url) {
    const videoId = url.split('/live/')[1].split('?')[0];
    console.log('Attempting to load video:', videoId);

    if (playerReady) {
        player.loadVideoById(videoId);
    } else {
        console.error('Player not ready');
    }
}

function populateVideoList() {
    const videoItems = document.getElementById('videoItems');
    videoItems.innerHTML = '';

    liveStreams.forEach(async (stream, index) => {
        const videoId = stream.url.split('/live/')[1].split('?')[0];
        const title = await fetchVideoTitle(videoId);
        const li = document.createElement('li');
        li.textContent = title;
        li.addEventListener('click', () => {
            currentVideoIndex = index;
            loadVideo(stream.url);
        });
        videoItems.appendChild(li);
    });
}

// Previous button functionality
document.getElementById('previous').addEventListener('click', function() {
    currentVideoIndex = (currentVideoIndex > 0) ? currentVideoIndex - 1 : liveStreams.length - 1;
    loadVideo(liveStreams[currentVideoIndex].url);
});

// Next button functionality
document.getElementById('next').addEventListener('click', function() {
    currentVideoIndex = (currentVideoIndex < liveStreams.length - 1) ? currentVideoIndex + 1 : 0;
    loadVideo(liveStreams[currentVideoIndex].url);
});

const pauseButton = document.getElementById('pause');
const playButton = document.getElementById('play');
const volumeSlider = document.getElementById('volume-slider');

playButton.addEventListener('click', function() {
    player.playVideo();
});

pauseButton.addEventListener('click', function() {
    player.pauseVideo();
});

volumeSlider.addEventListener('input', function() {
    player.setVolume(this.value);
});
if (typeof YT !== 'undefined' && typeof YT.Player !== 'undefined') {
    onYouTubeIframeAPIReady();
} else {
    console.error('YouTube IFrame API is not loaded');
}
