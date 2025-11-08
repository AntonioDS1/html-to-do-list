let inputTodo = document.getElementById("task-input");
let addTodo = document.getElementById("add-task-btn");
let taskList = document.querySelector(".task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let count = tasks.length; 

function aggiungi() {
  const task = inputTodo.value.trim();
  if (!task) return;
  addTask(task);
}

addTodo.addEventListener("click", aggiungi);
inputTodo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") aggiungi();
});

function addTask(task) {
  if (count >= 10 || task.length === 0) return;
  if (task.length > 28) {
    alert("Non stressarti troppo!");
    inputTodo.value = "";
    return;
  }

  const item = document.createElement("div");
  item.classList.add("list-item");
  item.innerHTML = `
    <li class="gottado">${task}</li>
    <div class="check-or-delete">
      <input type="checkbox" class="check-item">
      <button class="delete-item">🗑️</button>
    </div>
  `;

  taskList.appendChild(item);
  inputTodo.value = "";
  count++;

  
  tasks.push({ text: task, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("check-item")) {
    const itemPadre = e.target.closest(".list-item");
    const testo = itemPadre.querySelector(".gottado");

    testo.classList.toggle("fatto");

    const taskText = testo.textContent;
    const t = tasks.find(t => t.text === taskText);
    if (t) {
      t.done = testo.classList.contains("fatto");
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
});


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-item")) {
    const padre = e.target.closest(".list-item");
    const testo = padre.querySelector(".gottado").textContent;

    padre.remove();
    tasks = tasks.filter(t => t.text !== testo); 
    localStorage.setItem("tasks", JSON.stringify(tasks));
    count--;
  }
});


window.addEventListener("DOMContentLoaded", () => {
  tasks.forEach(task => createTaskFromStorage(task));
});

function createTaskFromStorage(task) {
  const item = document.createElement("div");
  item.classList.add("list-item");
  item.innerHTML = `
    <li class="gottado ${task.done ? "fatto" : ""}">${task.text}</li>
    <div class="check-or-delete">
      <input type="checkbox" class="check-item" ${task.done ? "checked" : ""}>
      <button class="delete-item">🗑️</button>
    </div>
  `;
  taskList.appendChild(item);
}


