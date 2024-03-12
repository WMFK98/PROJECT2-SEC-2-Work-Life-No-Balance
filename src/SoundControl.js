class SoundControl {
  constructor() {
    this.isOffMusic = false;
    this.isOffSFX = false;
  }
  changeMusic(music) {
    if (this.music) this.music.remove();
    this.music = new Audio(music);
    this.music.loop = true;
  }
  playSoundSFX(sound) {
    if (!this.sound || this.isOffSFX) return;
    new Audio(sound).play();
  }
  playSoundMusic() {
    if (!this.music || this.isOffMusic) return;
    this.music.play();
  }
  stopSoundMusic() {
    if (!this.music || this.isOffMusic) return;
    this.music.pause();
  }
  toggleSoundMusic() {
    this.isOffMusic = !this.isOffMusic;
  }
  toggleSoundSFX() {
    this.isOffSFX = !this.isOffSFX;
  }
}
export default new SoundControl();
