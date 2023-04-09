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
    const formattedTime = currentTime.toLocaleTimeString();
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
        audioPlayer.src = songs[index].url;
        audioPlayer.play();
    };
}
