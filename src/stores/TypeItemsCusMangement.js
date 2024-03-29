import { acceptHMRUpdate, defineStore } from "pinia";
import {reactive} from "vue"
export const useCustom =  defineStore("customItem", () => {
  const customItem = reactive([]);
  const updateTypeItem = (id, newTypeItem) => {
    customItem[findIndexTypeItem(id)] = {
      ...customItem[findIndexTypeItem(id)],
      ...newTypeItem,
    };
  }
  const searchTypeItemByName = (searchName)=> {
    return customItem.filter(({ name }) => name === searchName);
  }
  const findTypeItem = (id) => {
    return customItem.find((item) => item.id === id);
  }
  const findIndexTypeItem = (id) =>{
    return customItem.findIndex((item) => item.id === id);
  }
  const removePollItem = (id)=> {
    customItem.splice(findIndexTypeItem(id), 1);
  }
  const getAllTypeItems = ()=> {
    return customItem;
  }
  const addTypeItem = (typeItem) =>{
    customItem.push(typeItem);
    console.log(customItem);
  }

  const addTypeItems = (typeItems = []) => {
    customItem.length = 0
    typeItems.forEach((typeItem) => customItem.push(typeItem));
  }
  return { searchTypeItemByName , findIndexTypeItem ,findTypeItem,removePollItem,getAllTypeItems,addTypeItems,addTypeItem ,updateTypeItem}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate( useCustom, import.meta.hot));
}
