const songs = [
"/Music/__.mp3",
"/Music/90's flav - call me.mp3",
"/Music/Brandon Kai - 3 AM.mp3",
"/Music/Flance - Somedays.mp3",
"/Music/j^p^n - amend (second part looped).mp3",
"/Music/Kanisan x Wishes and Dreams - morning moon.mp3",
"/Music/kudasai - dream of her.mp3",
"/Music/kudasai - technicolor.mp3",
"/Music/kudasai - the girl i haven't met.mp3",
"/Music/Lavender.mp3",
"/Music/Let Me Hold You.mp3",
"/Music/Melatonin.mp3",
"/Music/Ocean I.mp3",
"/Music/peace of Mind.mp3",
"/Music/Stargazing.mp3",

];


const playNextSong = () => {
    console.log(__dirname)
    const audioTag = document.getElementById("audio");
    audioTag.src = songs[Math.floor(Math.random() * songs.length)];
    audioTag.play();
    audioTag.onended = playNextSong;
}






