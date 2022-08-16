document.addEventListener('DOMContentLoaded', function() {
	const formSubmit = document.getElementById('form');
	formSubmit.addEventListener('submit', function(event) {
		event.preventDefault();
		addTodo();
	})
})

function addTodo() {
	const todoText = document.getElementById('title').value;
	const times = document.getElementById('date').value;

	const generatId = generatID();
	const ToDoObject = generatToDoObject(generatId, todoText, times, false);
	todo.push(ToDoObject);

	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function generatID() {
	return +new Date();
}

function generatToDoObject(id, task, timestamp, isCompleted) {
	return {
		id,
		task,
		timestamp,
		isCompleted
	}
}

const todo = [];
const RENDER_EVENT = 'render-todo';

document.addEventListener(RENDER_EVENT, function() {
	// console.log(todo);
	const unCompleteTodo = document.getElementById('todos');
	unCompleteTodo.innerHTML = '';

	const completeTodo = document.getElementById('completed-todos');
	completeTodo.innerHTML = '';

  for (const todoItem of todo) {
  	 	const todoElement = makeToDo(todoItem);
  	 	if (!todoItem.isCompleted) {
  	 		unCompleteTodo.appendChild(todoElement);
  	 	} 

      else {
  	 		completeTodo.appendChild(todoElement);
  	 	}
	 } 
})

function makeToDo(todoObject) {
	const titleText = document.createElement('h2');
	titleText.innerText = todoObject.task;

	const timesText = document.createElement('p');
	timesText.innerText = todoObject.timestamp;

	const containerText = document.createElement('div');
	containerText.classList.add('inner');
	containerText.append(titleText, timesText);

	const container = document.createElement('div');
	container.classList.add('item', 'shadow');
	container.append(containerText);
	container.setAttribute('id', `todo-${todoObject.id}`);

	if (todoObject.isCompleted) {
		const unButton = document.createElement('button');
		unButton.classList.add('undo-button');

		unButton.addEventListener('click', function() {
			undoTaskFromCompleted(todoObject.id);
		})

		const trashButton = document.createElement('button');
		trashButton.classList.add('trash-button');

		trashButton.addEventListener('click', function() {
			removeTaskFromCompleted(todoObject.id);
		})

		container.append(unButton, trashButton);
	}

	else {
		const cekButton = document.createElement('button');
		cekButton.classList.add('check-button');

		cekButton.addEventListener('click', function() {
			addTaskCompleted(todoObject.id);
		})

		container.append(cekButton);
	}

	return container;
}

function addTaskCompleted(todoID) {
	const todoTarget = findTodo(todoID);

	if (todoID == null) return;

	todoTarget.isCompleted = true;

	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function findTodo(todoID) {
	for (todoItem of todo) {
		if (todoItem.id === todoID) {
			return todoItem;
		}
	}

	return null;
}

function removeTaskFromCompleted(todoID) {
	const todoTarget = findTodo(todoID);

	if (todoTarget === -1) return;

	todo.splice(todoTarget, 1);

	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function undoTaskFromCompleted(todoID) {
	const todoTarget = findTodo(todoID);

	if (todoTarget == null) return;

	todoTarget.isCompleted = false;
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function findTodoIndex(todoID) {
	for (const index in todo) {
		if (todo[index].id === todoID) {
		  return index;
		}
	}

	return -1;
}

// fitur web storage
const SAVED_EVENT = 'save-todo';
const STORAGE_KEY = 'todo-app';

function saveData() {
	if (isStorageExist()) {
		const parsed = JSON.stringify(todo);
		localStorage.setItem(STORAGE_KEY, parsed);
		document.dispatchEvent(new Event(SAVED_EVENT));
	}
}

function isStorageExist() {
	if (typeof(Storage) === undefined) {
		alert('Browser kamu tidak mendukung local storage');
		return false;
	}

	return true;
}

document.addEventListener(SAVED_EVENT, function() {
	console.log(localStorage.getItem(STORAGE_KEY));
})

function loadDataFromStorage() {
	const serialData = localStorage.getItem(STORAGE_KEY);
	let data = JSON.parse(serialData);

	if (data !== null) {
		for (const todoData of data) {
			todo.push(todoData);
		}
	}

	document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener('DOMContentLoaded', function() {
	if (isStorageExist()) {
		loadDataFromStorage();
	}
})