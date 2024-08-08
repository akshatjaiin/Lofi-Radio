const liveUurls = [
    'https://www.youtube.com/live/5yx6BWlEVcY?si=ebplKrv07gmWR-mv',
    'https://www.youtube.com/live/rUxyKA_-grg?si=94qsl5CFsnun_ukC',
    'https://www.youtube.com/live/36YnV9STBqc?si=POYUYRaWpgwJP-M0',
    'https://www.youtube.com/live/jfKfPfyJRdk?si=7Q04P0ves89HW2cv',
    'https://www.youtube.com/live/S_MOd40zlYU?si=PaM8mr_TM4VHd_gn',
    'https://www.youtube.com/live/JWlKA9wmO64?si=5lW1F10y3LoEYJJC',
    'https://www.youtube.com/live/wDA4kdgC0bc?si=ubfq6loGFcKXhA52',
    'https://www.youtube.com/live/qH3fETPsqXU?si=9dZWMZe33X_dFiAe',
    'https://www.youtube.com/live/wkhLHTmS_GI?si=9_BA1Dv4HLj3Xqeg'
];

const liveStreamList = document.getElementById('liveStreamList');
let currentPlayer = null; // Variable to hold the current player

liveUurls.forEach(url => {
    const li = document.createElement('li');
    const iframe = document.createElement('iframe');
    iframe.src = url.replace('/live/', '/embed/') + '?enablejsapi=1'; // Use enablejsapi for API control
    iframe.title = 'Live Stream';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;

    // Add click event to the list item
    li.appendChild(iframe);
    li.addEventListener('click', () => {
        // If there's a current player, pause it
        if (currentPlayer) {
            currentPlayer.pauseVideo();
        }

        // Create a new player for the clicked iframe
        currentPlayer = new YT.Player(iframe, {
            events: {
                'onReady': function(event) {
                    event.target.playVideo(); // Play the new video
                }
            }
        });
    });

    liveStreamList.appendChild(li);
});

// Load the YouTube API asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
