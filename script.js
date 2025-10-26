
let todo = JSON.parse(localStorage.getItem("todo")) || [];
//Lataa aijemmin tallennetut tehtävät, jos on. Muussa tapauksessa tekee tyhjän taulukon.
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.querySelector(".deleteButton");

document.addEventListener("DOMContentLoaded", function() {      //Kuuntelijat
    addButton.addEventListener("click", addTask);               // + Napille
    todoInput.addEventListener('keydown', function (event) {       //tehtävien syötölle
        if (event.key == "Enter") {                             //enterille
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);        //poista kaikki napille
    displayTasks();
});

function addTask() {     //lisää tehtävä ja tallenna local storageen. Jos alle 2 kirjainta, saa alertin.
  const text = todoInput.value.trim();
  if (text.length < 2) {
    alert("Tehtävässä ei voi olla yhtä kirjainta!");
    return;
  }
  todo.push({ text, disabled: false });
  saveToLocalStorage();
  todoInput.value = "";
  displayTasks();
}

function displayTasks() {           //Tekee listan tehtävistä 
    todoList.innerHTML = "";
    todo.forEach(function(item, index) {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
                <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}">${item.text}</p>
            </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
     });
        todoList.appendChild(p);
    });
}

function toggleTask(index) {    //asettaa valitun tehtävän tehdyksi.
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks() {  //poistaa kaikki tehtävät ja päivittää localstoragen.
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage() {  
    localStorage.setItem("todo", JSON.stringify(todo));
}
