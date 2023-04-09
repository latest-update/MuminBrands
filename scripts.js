let currentlyPlaying = -1;

document.addEventListener('DOMContentLoaded', () => {
    fetch('songs.json')
        .then(response => response.json())
        .then(songs => displaySongs(songs));

    updateTime();
    setInterval(updateTime, 1000);
    document.getElementById('music-list').style.height = (document.body.clientHeight - 450)+ "px";
});

function toggleTheme() {
    document.body.classList.toggle('dark');
}

function updateTime() {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('current-time').innerText = formattedTime;
}

function displaySongs(songs) {
    const musicList = document.getElementById('music-list');
    const audioPlayer = document.getElementById('audio-player');

    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = 'item';
        songItem.innerHTML = `
            <div class="content">
                <a class="header" href="javascript:void(0);" onclick="playSong(${index})">${song.title}</a>
            </div>`;
        musicList.appendChild(songItem);
    });

    window.playSong = (index) => {
        const audioPlayer = document.getElementById('audio-player');
        const allItems = document.querySelectorAll('.item');

        if (index === currentlyPlaying) {
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        } else {
            if (currentlyPlaying !== -1) {
                allItems[currentlyPlaying].classList.remove('active');
            }
            currentlyPlaying = index;
            audioPlayer.src = songs[currentlyPlaying].url;
            audioPlayer.play();
            allItems[currentlyPlaying].classList.add('active');
        }
    };
}
