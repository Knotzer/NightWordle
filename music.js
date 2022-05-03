const songs = [
    // "/music/__.mp3",
    // "/music/90's flav - call me.mp3",
    // "/music/Brandon Kai - 3 AM.mp3",
    // "/music/Flance - Somedays.mp3",
    // "/music/j^p^n - amend (second part looped).mp3",
    // "/music/Kanisan x Wishes and Dreams - morning moon.mp3",
    // "/music/kudasai - dream of her.mp3",
    // "/music/kudasai - technicolor.mp3",
    // "/music/kudasai - the girl i haven't met.mp3",
    // "/music/Lavender.mp3",
    // "/music/Let Me Hold You.mp3",
    // "/music/Melatonin.mp3",
    // "/music/Ocean I.mp3",
    // "/music/peace of Mind.mp3",
    // "/music/Stargazing.mp3",

    "/__.mp3",
    "/90's flav - call me.mp3",
    "/Brandon Kai - 3 AM.mp3",
    "/Flance - Somedays.mp3",
    "/j^p^n - amend (second part looped).mp3",
    "/Kanisan x Wishes and Dreams - morning moon.mp3",
    "/kudasai - dream of her.mp3",
    "/kudasai - technicolor.mp3",
    "/kudasai - the girl i haven't met.mp3",
    "/Lavender.mp3",
    "/Let Me Hold You.mp3",
    "/Melatonin.mp3",
    "/Ocean I.mp3",
    "/peace of Mind.mp3",
    "/Stargazing.mp3",

    
];


const playNextSong = () => {
    
    const audioTag = document.getElementById("audio");
    audioTag.src = songs[Math.floor(Math.random() * songs.length)];
    console.log(audioTag.src)
    audioTag.play();
    audioTag.onended = playNextSong;
}






