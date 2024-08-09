const liveStreams = [
    { name: 'Lofi 1', url: 'https://www.youtube.com/live/5yx6BWlEVcY?si=ebplKrv07gmWR-mv' },
    { name: 'Chill Beats', url: 'https://www.youtube.com/live/rUxyKA_-grg?si=94qsl5CFsnun_ukC' },
    { name: 'Relaxing Vibes', url: 'https://www.youtube.com/live/Yw8co39m3GQ?si=UnDXZzfOfGT3aWUV' },
    { name: 'Ambient Sounds', url: 'https://www.youtube.com/live/S_MOd40zlYU?si=PaM8mr_TM4VHd_gn' },
    { name: 'Lofi Chill', url: 'https://www.youtube.com/live/qH3fETPsqXU?si=9dZWMZe33X_dFiAe' },
    { name: 'Mellow Mix', url: 'https://www.youtube.com/live/wkhLHTmS_GI?si=9_BA1Dv4HLj3Xqeg' },
    { name: 'Dreamy Tunes', url: 'https://www.youtube.com/live/_uMuuHk_KkQ?si=LoSo3lmZhpYXd6u0' },
    { name: 'Lofi-Girl Anime', url: 'https://www.youtube.com/live/Na0w3Mz46GA?si=P0G5kwg55FCI2rS-' },
    { name: 'Peaceful Piano', url: 'https://www.youtube.com/live/4oStw0r33so?si=SMtw_Sm2JmWeAhOd' },
];

let player;
let playerReady = false;
let currentVideoIndex = 0; // Track the current video index

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
            'showinfo': 0,
            'rel': 0,
            'iv_load_policy': 3,
            'fs': 0,
            'cc_load_policy': 0,
            'autoplay': 1,
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
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
    } else {
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
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

    liveStreams.forEach((stream, index) => {
        const li = document.createElement('li');
        li.textContent = stream.name; // Use the name property directly
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
