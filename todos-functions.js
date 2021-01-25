//Fetch existing saved todos from local storage
const getSavedTodos = function () {
  const userJSON = localStorage.getItem("todos");
  if (userJSON !== null) {
    return JSON.parse(userJSON);
  } else {
    return [];
  }
};

//Save Todos to local Storage
const saveTodos = function (todos) {
  const todosJSON = JSON.stringify(todos);
  localStorage.setItem("todos", todosJSON);
};
//Remove Todos from array by id
const removeTodos = function (id) {
  const indexTodo = todos.findIndex(function (todo) {
    return todo.id === id;
  });
  if (indexTodo > -1) {
    todos.splice(indexTodo, 1);
  }
};

//Checkbox modify. Toggle a completed value for a given todo
const toggleCheckbox = function (id){
  const todo = todos.find(function(todo){
    return todo.id===id;
  })
  if(todo!=undefined)
  todo.completed=!todo.completed;
}

//Render todos based on filters
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
    console.log(generateTodoDOM(todo));
    document.querySelector("#todos").append(generateTodoDOM(todo));
  });
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));
};

//Get the DOM elements for individual todo
const generateTodoDOM = function (todo) {
  const newEl = document.createElement("div");
  const p = document.createElement("span");
  const button = document.createElement("button");
  const checkBox = document.createElement("input");
  //Setup todo checkbox
  checkBox.setAttribute("type", "checkbox");
  newEl.appendChild(checkBox);
  checkBox.checked = todo.completed;
  checkBox.addEventListener("change", function (e) {
    toggleCheckbox(todo.id);
    saveTodos(todos);
    filterTodos(todos, filters);
  });
  //Setp the todo text
  p.textContent = todo.text;
  newEl.appendChild(p);
  //Setup the button todo
  button.textContent = "x";
  newEl.appendChild(button);
  button.addEventListener("click", function (e) {
    removeTodos(todo.id);
    saveTodos(todos);
    filterTodos(todos, filters);
  });
  return newEl;
};

//Get the DOM elements for list Summary
const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
