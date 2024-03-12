class SoundControl {
  constructor() {
    this.isOffMusic = false;
    this.isOffSFX = false;
  }
  changeMusic(music) {
    this.music = new Audio(music);
    this.music.loop = true;
  }
  playSoundSFX(sound) {
    if (!this.sound || this.isOffSFX) return;
    new Audio(sound).soundSelect.play();
  }
  playSoundMusic() {
    if (!this.music || this.isOffMusic) return;
  }
  toggleSoundMusic() {
    this.isOffMusic = !this.isOffMusic;
  }
  toggleSoundSFX() {
    this.isOffSFX = !this.isOffSFX;
  }
}
export default new SoundControl();
