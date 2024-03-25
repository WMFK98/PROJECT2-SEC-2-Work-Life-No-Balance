export default class TypeItemsCusMangement {
  _typeItems = [];
  constructor(typeItems = []) {
    this._typeItems = typeItems;
  }
  updateTypeItem(id, newTypeItem) {
    this._typeItems[this.findIndexTypeItem(id)] = {
      ...this._typeItems[this.findIndexTypeItem(id)],
      ...newTypeItem,
    };
  }

  searchTypeItemByName(searchName) {
    return this._typeItems.filter(({ name }) => name === searchName);
  }
  findTypeItem(id) {
    return this._typeItems.find((item) => item.id === id);
  }
  findIndexTypeItem(id) {
    return this._typeItems.findIndex((item) => item.id === id);
  }
  removePollItem(id) {
    this._typeItems.splice(this.findIndexTypeItem(id), 1);
  }
  getAllTypeItems() {
    return this._typeItems;
  }
  addTypeItem(typeItem) {
    this._typeItems.push(typeItem);
  }

  addTypeItems(typeItems = []) {
    typeItems.forEach((typeItem) => this._typeItems.push(typeItem));
  }
}
