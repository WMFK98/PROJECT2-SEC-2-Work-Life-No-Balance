import Item from "../StateItem";
import { acceptHMRUpdate, defineStore } from "pinia";
import {reactive} from "vue"
export const useCustom =  defineStore("customItem", () => {
  let customItem = reactive([]);

  const searchTypeItemByName = (searchName)=> {
    return customItem.filter(({ name }) => name === searchName);
  }
  const findTypeItem = (id) => {
    return customItem.find((item) => item.id === id);
  }
  const findIndexfindTypeItem = (id) =>{
    return customItem.findIndex((item) => item.id === id);
  }
  const removePollItem = (id)=> {
    customItem.splice(findIndexItem(id), 1);
  }
  const getAllTypeItems = ()=> {
    return customItem;
  }
  const addTypeItem = (typeItem) =>{
    customItem.push(typeItem);
  }

  const addTypeItems = (typeItems = []) => {
    typeItems.forEach((typeItem) => customItem.push(typeItem));
  }
  return { searchTypeItemByName , findIndexfindTypeItem ,findTypeItem,removePollItem,getAllTypeItems,addTypeItems,addTypeItem}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate( useCustom, import.meta.hot));
}


// import { acceptHMRUpdate, defineStore } from "pinia";
// import { reactive } from "vue";
// export const useTodos = defineStore("todos", () => {
//   // state
//   let todos = reactive([]);
//   // view
//   const getTodo = () => {
//     return todos;
//   };
//   const addTodos = (newTodos) => {
//     newTodos.forEach((newTodo) =>
//       addTodo(newTodo.id, newTodo.category, newTodo.description)
//     );
//   };
//   const addTodo = (id, category, desc) => {
//     todos.push({
//       id: id,
//       category: category,
//       description: desc,
//     });
//   };
//   const updateTodo = (id, category, description) => {
//     todos = todos.map((todo) => {
//       return todo.id === id
//         ? { ...todo, category: category, description: description }
//         : todo;
//     });
//   };
//   const findTodo = (searchId) => {
//     return todos.find((todo) => todo.id === searchId);
//   };
//   const findIndexTodo = (searchId) => {
//     return todos.findIndex((todo) => todo.id === searchId);
//   };
//   const removeTodo = (removeId) => {
//     todos.splice(
//       todos.findIndex((todo) => todo.id === removeId),
//       1
//     );
//   };
//   return {getTodo, addTodo ,addTodos ,updateTodo, findIndexTodo ,findTodo , removeTodo}
// });
