export default class Item {
  static nextId = 1;

  constructor(typeItem) {
    this.id = Item.nextId++;
    this.isUsed = false;
    this.itemInfo = { ...typeItem };
  }
  toggleUsed() {
    this.isUsed = !this.isUsed;
  }
}
