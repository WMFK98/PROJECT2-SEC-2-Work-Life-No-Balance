let isOffMusic = false;
let isOffSFX = false;
let currentMusic = new Audio();

export function playSoundSFX(sound) {
  if (!sound || isOffSFX) return;
  new Audio(sound).play();
}
export function playSoundMusic(newPathMusic) {
  if (newPathMusic !== currentMusic.src) {
    currentMusic.pause();
    currentMusic = new Audio(currentPathMusic);
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
