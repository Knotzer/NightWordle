﻿const songs = [
"/music/__.mp3",
"/music/90's flav - call me.mp3",
"/music/Brandon Kai - 3 AM.mp3",
"/music/Flance - Somedays.mp3",
"/music/j^p^n - amend (second part looped).mp3",
"/music/Kanisan x Wishes and Dreams - morning moon.mp3",
"/music/kudasai - dream of her.mp3",
"/music/kudasai - technicolor.mp3",
"/music/kudasai - the girl i haven't met.mp3",
"/music/Lavender.mp3",
"/music/Let Me Hold You.mp3",
"/music/Melatonin.mp3",
"/music/Ocean I.mp3",
"/music/peace of Mind.mp3",
"/music/Stargazing.mp3",

];


const playNextSong = () => {
    console.log(__dirname)
    const audioTag = document.getElementById("audio");
    audioTag.src = songs[Math.floor(Math.random() * songs.length)];
    audioTag.play();
    audioTag.onended = playNextSong;
}






