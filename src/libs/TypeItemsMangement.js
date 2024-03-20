import Item from "../StateItem";

export default class TypeItemsMangement {
  _typeItems = [];
  constructor(typeItems) {
    this._typeItems = typeItems;
  }
  searchTypeItemByName(searchName) {
    return this._typeItems.filter(({ name }) => name === searchName);
  }
  findTypeItem(id) {
    return this._typeItems.find((item) => item.id === id);
  }
  findIndexfindTypeItem(id) {
    return this._typeItems.findIndex((item) => item.id === id);
  }
  removePollItem(id) {
    this._typeItems.splice(this.findIndexItem(id), 1);
  }
  getAllTypeItems() {
    return this._typeItems;
  }
  addTypeItem(typeItem) {
    this._typeItems.push(new Item(typeItem));
  }
}
