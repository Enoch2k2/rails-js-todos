const BASE_URL = 'http://localhost:3000'

function displayCreateForm(){
  let todoFormDiv = document.getElementById('todo-form');
  let html =  `
    <form onsubmit="createTodo(); return false;">
      <label>Title: </label>
      <input type="text" id="title"><br/>
      <label>Complete: </label>
      <input type="checkbox" id="complete"><br/>
      <input type="submit" value="Create Todo">
    </form>
  `
  todoFormDiv.innerHTML = html;
}

function getTodos() {
  clearForm();
  let main = document.getElementById('main');
  main.innerHTML = '<ul>';
  fetch(BASE_URL + '/todos.json')
  .then(resp => resp.json())
  .then(todos => {
    main.innerHTML += todos.map(todo => `<li><a href="#" data-id="${todo.id}">${todo.title}</a> - ${completed(todo)}</li>`).join('')
    main.innerHTML += '</ul>'

    attachClickToTodoLinks();
  })
}


function clearForm(){
  let todoFormDiv = document.getElementById('todo-form');
  todoFormDiv.innerHTML = '';
}

function displayTodo(e) {
  e.preventDefault();
  clearForm();
  let id = this.dataset.id;
  let main = document.getElementById('main');
  main.innerHTML = '';

  fetch(BASE_URL + '/todos/' + id + '.json')
    .then(resp => resp.json())
    .then(todo => {
      main.innerHTML += `<h3>${todo.title}</h3>`;
      main.innerHTML += `<p>${completed(todo)}</p>`
    })
}

function completed(todo) {
  return todo.complete ? 'Complete' : 'Not Complete';
}

function createTodo() {
  const todo = {
    title: document.getElementById('title').value,
    complete: document.getElementById('complete').value
  }
  fetch(BASE_URL + '/todos', {
    method: 'POST',
    body: JSON.stringify({ todo }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(resp => resp.json())
  .then(todo => {
    document.querySelector("#main ul").innerHTML += `<li>${todo.title} - ${todo.complete ? 'Completed' : 'Not Completed'}</li>`
    let todoFormDiv = document.getElementById('todo-form');
    todoFormDiv.innerHTML = '';
  })
}

function attachClickToTodoLinks() {
  let todos = document.querySelectorAll('li a');
  for (let i = 0; i < todos.length; i++) {
    todos[i].addEventListener('click', displayTodo)
  }
}

window.addEventListener('load', function(){
  attachClickToTodoLinks();
})