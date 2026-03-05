let projects = [];
let todos = [];
let currentProjectId = null;

function createProject(name, description, dueDate) {
    return {
        id: crypto.randomUUID(),
        name,
        description,
        dueDate
    };
}

function createToDo(name, description, dueDate, priority, projectId) {
    return {
        id: crypto.randomUUID(),
        name,
        description,
        dueDate,
        priority,
        completed: false,
        projectId
    };
}

function inputProject() {
    const projectList = document.getElementById("projects");
    projectList.innerHTML = "";

    projects.forEach(project => {
        const li = document.createElement("li");
        li.textContent = `${project.name} (Due: ${project.dueDate})`;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            alert("Click on that tiny button to add a to-do");
            currentProjectId = project.id;
            inputToDo();
        });

        projectList.appendChild(li);
    });
}

function inputToDo() {
    const todoList = document.getElementById("todo-btn");
    todoList.innerHTML = "";

    if (!currentProjectId) return;

    const filteredToDos = todos.filter(
        todo => todo.projectId === currentProjectId
    );

    filteredToDos.forEach(todo => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${todo.name}</strong><br>
            ${todo.description}<br>
            Due: ${todo.dueDate}<br>
            Priority: ${todo.priority}<br>`;

        todoList.appendChild(li);
    });
}

document.getElementById("project-btn").addEventListener("click", () => {
    const name = prompt("Project Name: ");
    if (!name) return;

    const description = prompt("Project description: ");
    const dueDate = prompt("Project due date: ");

    const newProject = createProject(name, description, dueDate);
    projects.push(newProject);

    inputProject();
});

document.getElementById("todo-btn").addEventListener("click", () => {
    if (!currentProjectId) {
        alert("A project hasn't been chosen yet (click on one)");
        return;
    }

    const name = prompt("ToDo name: ");
    if (!name) return;

    const description = prompt("ToDo description: ");
    const dueDate = prompt("ToDo due date: ");
    const priority = prompt("Priority level: ");

    const newToDo = createToDo(name, description, dueDate, priority, currentProjectId);
    todos.push(newToDo);
    inputToDo();
});