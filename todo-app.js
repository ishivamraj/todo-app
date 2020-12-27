let todos = [];
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

const userJSON = localStorage.getItem("todos");
if (userJSON !== null) {
  todos = JSON.parse(userJSON);
}

const filterTodos = function (todos, filters) {
  const filtersT = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  // if(filters.hideCompleted){
  // return !todo.completed
  // }
  // else {
  // return true
  // }

  const incompleteTodos = filtersT.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";

  const renderTodos = filtersT.forEach(function (todo) {
    const newEl = document.createElement("p");
    newEl.textContent = todo.text;
    document.querySelector("#todos").append(newEl);
  });

  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  document.querySelector("#todos").appendChild(summary);
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
  const todosJSON = JSON.stringify(todos)
  localStorage.setItem('todos', todosJSON)
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
