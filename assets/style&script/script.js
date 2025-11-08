let inputTodo = document.getElementById("task-input");
let addTodo = document.getElementById("add-task-btn");

let taskList = document.querySelector(".task-list");

let count = 0;

function aggiungi() {
    let task = inputTodo.value;

    addTask(task);
}

addTodo.addEventListener("click", aggiungi);

inputTodo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") aggiungi();
});



function addTask(task) {
    
    if (count >= 10 || task.length === 0) return;
    if (task.length > 28) {alert("Non stressarti troppo!"); inputTodo.value = ""; return;};

    const item = document.createElement("div");
    item.classList.add("list-item");
    item.innerHTML =  `
    <li>${task}</li>
    <div class="check-or-delete">
      <input type="checkbox" class="check-item">
      <button class="delete-item">🗑️</button>
    </div>
  `;

  taskList.appendChild(item);

  inputTodo.value = "";

  count++;
}