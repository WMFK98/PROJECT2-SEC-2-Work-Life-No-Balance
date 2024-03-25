let isOffMusic = false;
let isOffSFX = false;
let currentMusic = new Audio();
let currentPathMusic = "";

export function playSoundSFX(sound) {
  if (!sound || isOffSFX) return;
  new Audio(sound).play();
}
export function playSoundMusic(newPathMusic) {
  if (newPathMusic !== currentPathMusic) {
    currentMusic.pause();
    currentMusic = new Audio(newPathMusic);
    currentMusic.loop = true;
    currentMusic.volume = 0.3;
    currentPathMusic = newPathMusic;
  }
  if (!isOffMusic) currentMusic.play();
}
export function toggleSoundMusic() {
  if (!currentMusic) return;
  isOffMusic = !isOffMusic;
  if (isOffMusic) currentMusic.pause();
  else currentMusic.play();
}

export function toggleSoundSFX() {
  isOffSFX = !isOffSFX;
}
export function stopMusic() {
  currentMusic.pause();
  currentMusic.currentTime = 0;
}

export function setSoundDefault() {
  isOffMusic = false;
  isOffSFX = false;
}

export function setSound(obj) {
  isOffMusic = obj.isOffMusic;
  isOffSFX = obj.isOffSFX;
}
