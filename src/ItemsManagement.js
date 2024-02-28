import Item from './Item';
import { random } from './tool';
import seItemsound from '/music/useItemsound.mp3';
export default class ItemsManagement {
  _items = [];
  constructor(owner, pollItem, limitItem = 7) {
    this.owner = owner;
    this.pollItem = pollItem;
    this.limitItem = limitItem;
  }
  findItem(id) {
    return this._items.find((item) => item.id === id);
  }
  findIndexItem(id) {
    return this._items.findIndex((item) => item.id === id);
  }
  toggleUsedItem(id, isPlaySound) {
    this.findItem(id).toggleUsed();
    if (!isPlaySound) return;
    const sound = new Audio(seItemsound);
    sound.play();
  }
  UnusedAllItem() {
    this._items.forEach((item) => (item.isUsed = false));
  }

  removeItembyUsedItem() {
    this.getAllItemUsed().forEach(({ id }) => this.removeItem(id));
  }
  removeItem(id) {
    this._items.splice(this.findIndexItem(id), 1);
  }
  clearAll() {
    this._items = [];
  }
  getAllItem() {
    return this._items;
  }
  addItem(typeItem) {
    if (this._items.length < this.limitItem)
      this._items.push(new Item(typeItem));
  }
  addRandomItem(amout = 1) {
    if (this.pollItem.length < 1) {
      return;
    }
    for (let i = 0; i < amout; i++) {
      const item = this.pollItem[random(0, this.pollItem.length - 1)];
      this.addItem(item);
    }
  }
  getAllItemUsed() {
    return this._items.filter(({ isUsed }) => isUsed);
  }

  setLimitItem(limitItem) {
    this.limitItem = limitItem;
  }
  changePollitem(poll) {
    this.pollItem = poll;
  }
}
