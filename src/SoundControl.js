const SoundControl = function () {
  let isOffMusic = false;
  let isOffSFX = false;
  let music = null;

  function changeMusic(newMusic) {
    if (music) music.pause();
    music = new Audio(newMusic);
    music.loop = true;
  }
  function playSoundSFX(sound) {
    if (!sound || isOffSFX) return;
    new Audio(sound).play();
  }
  function playSoundMusic() {
    if (!music || isOffMusic) return;
    music.play();
  }

  function toggleSoundMusic() {
    isOffMusic = !isOffMusic;
    if (isOffMusic) return music.pause();
    music.play();
  }
  function toggleSoundSFX() {
    isOffSFX = !isOffSFX;
  }

  return {
    changeMusic,
    playSoundMusic,
    playSoundSFX,
    toggleSoundMusic,
    toggleSoundSFX,
  };
};
export default SoundControl();
