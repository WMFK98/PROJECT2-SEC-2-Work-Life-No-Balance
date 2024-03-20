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
    currentPathMusic = newPathMusic;
  }
  if (!isOffMusic) currentMusic.play();
}
export function toggleSoundMusic() {
  if (!currentMusic) return;
  isOffMusic = !isOffMusic;
  if (isOffMusic) currentMusic.pause();
  else currentMusic.play();
  storeSoundSetting()
}
export function toggleSoundSFX() {
  isOffSFX = !isOffSFX;
  storeSoundSetting()

}
export function stopMusic() {
  currentMusic.pause();
  currentMusic.currentTime = 0;
}

export function loadSoundSetting(){
  if(localStorage.getItem("settings")){
    const newVal = JSON.parse(localStorage.getItem('settings'))
    isOffMusic  = newVal.musicSetting.isOffMusic
    isOffSFX =  newVal.musicSetting.isOffSFX
  }
  return { isOffMusic , isOffSFX}
}

export function storeSoundSetting(){
  const newVal = JSON.parse(localStorage.getItem('settings'))
  newVal.musicSetting = {isOffMusic,isOffSFX}
  localStorage.setItem('settings', JSON.stringify(newVal));
}

export function setDefault(){
  isOffMusic =false 
  isOffSFX = false
  storeSoundSetting();
}