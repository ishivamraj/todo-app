const todos = [
  {
    text: "Order cat food",
    completed: false,
  },
  {
    text: "Clean kitchen",
    completed: true,
  },
  {
    text: "Buy food",
    completed: true,
  },
  {
    text: "Do work",
    completed: false,
  },
  {
    text: "Exercise",
    completed: true,
  },
];
// const sel = document.querySelectorAll("p");
// sel.forEach(function (wrd) {
//   if (wrd.textContent.includes("the")) wrd.remove();
// });

// const incompleteTodos = todos.filter(function (todo) {
//   return !todo.completed;
// });



const filters = {
  searchText: "",
};

const filterTodos = function (todos, filters) {
  const filtersT = todos.filter(function (todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  const incompleteTodos = filtersT.filter(function(todo){
    return !todo.completed
  })

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
