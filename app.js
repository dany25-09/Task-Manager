//se imprime en la consola del navegador

const taskForm = document.getElementById("task__form")
const taskList = document.getElementById("task__list")

loadTasks()

//Almacenar la tarea que viene en el input
taskForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const taskInput = document.getElementById("task__input")

    const task = taskInput.value
    console.log(task)

    if(task) {
        taskList.append(createTaskElement(task))
        storeTaskInLocalStorage(task)
        taskInput.value = ""
    }
})

// Poner la tarea en la lista
function createTaskElement(task) {
    const li = document.createElement("li")
    // const buttonContainer = document.createElement("div")
    li.textContent = task
    li.append(createButton("❌", "delete__btn"), createButton("✏️", "edit__btn"))
    // li.append(buttonContainer)
    return li
}

//Crear los botones
function createButton(text, className) {
    const div = document.createElement("div")
    const btn = document.createElement("span")
    btn.textContent = text
    btn.className = className
    div.append(btn)
    return btn
}


// Funcionalidad de los botones
taskList.addEventListener("click", (event) => {
    // console.log(event.larget)
    if (event.target.classList.contains("delete__btn")) {
        deleteTask(event.target.parentElement)
    } else if (event.target.classList.contains("edit__btn")) {
        editeTask(event.target.parentElement)
    }
})


function deleteTask(taskItem) {
    if (confirm("Estás seguro de borrar este elemento?")) {
        removeFromLocalStorage(taskItem.firstChild.textContent);
        taskItem.remove()
    } 
}

function editeTask(taskItem) {
    const newTask = prompt("Edita la tarea: ", taskItem.firstChild.textContent)
    if (newTask !== null) {
        taskItem.firstChild.textContent = newTask
        updateLocalStorage()
    }
}


//guardar las tareas en el local storage
function storeTaskInLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    // console.log(tasks)

    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

//Cargar las tareas en la pantalla (Al recargar la página)
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")

    tasks.forEach ((task) => {
        taskList.appendChild(createTaskElement(task))
    })

}

//editar el local storage
function updateLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll("li")).map((li) =>{
        const listTaskmodified = li.firstChild.textContent
        return listTaskmodified
    })

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

//eliminar tareas en el local storage
function removeFromLocalStorage(taskContent) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  
    const updateTasks = tasks.filter((task) => task !== taskContent);
  
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
}

//tema
const themeToggleButton = document.getElementById("theme__toggle__btn")

themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark__theme");
    document.body.classList.toggle("clear__theme");

    const theme = document.body.classList.contains("dark__theme") ? "dark" : "light"
    localStorage.setItem("theme", theme)
});


//persistencia tema
const currentTheme = localStorage.getItem("theme")

if (currentTheme === "dark") {
    document.body.classList.remove("clear__theme");
    document.body.classList.add("dark__theme");

} else if (currentTheme === "dark") {
    document.body.classList.add("clear__theme");
}




