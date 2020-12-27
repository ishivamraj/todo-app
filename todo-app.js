const todos = getSavedTodos()
// const sel = document.querySelectorAll("p");
// sel.forEach(function (wrd) {
//   if (wrd.textContent.includes("the")) wrd.remove();
// });

// const incompleteTodos = todos.filter(function (todo) {
//   return !todo.completed;
// });

const filters = {
  searchText: "",
  hideCompleted: false,
};

filterTodos(todos, filters);

// todos.forEach(function (todo) {
//   const p = document.createElement('p')
//   p.textContent = todo.text
//   document.querySelector('body').appendChild(p)
// })

//Listen for New ToDo Creation
// document.querySelector("#create-todo").addEventListener("click", function (e) {
//   e.target.textContent = "Added a new todo!!";
// });

document.querySelector("#new-todo").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  filterTodos(todos, filters);
});

document.querySelector("#form-todo").addEventListener("submit", function (e) {
  e.preventDefault();
  todos.push({
    text: e.target.elements.todoName.value,
    completed: false,
  });
  saveTodos(todos)
  filterTodos(todos, filters);
  e.target.elements.todoName.value = "";
});

document.querySelector("#check-box").addEventListener("change", function (e) {
  filters.hideCompleted = e.target.checked;
  filterTodos(todos, filters);
});

//OTHER METHOD
// let c = 0;
// todos.forEach(function(todo, index){
//     if(!todo.completed)
//     c++;
// })

// const message = document.createElement('p');
// message.textContent = `You have ${c} todos left`
// const select = document.querySelector('body');
// select.appendChild(message);

// const arr = [];
// for(let i=0; i<todos.length; i++){
//     arr[i] = document.createElement('p');
//     arr[i].textContent = `${todos[i].todo}`;
//     select.appendChild(arr[i]);
// }
