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
  document.querySelector("#todos").appendChild(generateSummaryDOM(incompleteTodos));
};

//Get the DOM elements for individual todo
const generateTodoDOM = function (todo) {
  const newEl = document.createElement("p");
  if (todo.text.length > 0) {
    newEl.textContent = todo.text;
    return newEl;
  } else {
    newEl.textContent = "unnamed Task";
    return newEl;
  }
};



//Get the DOM elements for list Summary
const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary
};
