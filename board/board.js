document.addEventListener('DOMContentLoaded', async ()=>{
  await loadTasks();
  await init();
})

  function init() {
  renderTaskList("toDo", addedTasks);
  renderTaskList("inProgress", addedTasks);
  renderTaskList("awaitFeedback", addedTasks);
}



// Function to render tasks in a specified container
function renderTaskList(containerId, tasks) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const taskList = tasks[i][containerId]; // Get the specific task list (e.g., "to-do", "in-progress", "await-feedback")
    if (taskList || taskList.length > 0) {
      for (let j = 0; j < taskList.length; j++) {
        const task = taskList[j];
        container.innerHTML += createTaskElement(task, j, containerId);
        // Optional: Call functions to create subtasks, etc.
      }
    } else {
      container.innerHTML = emptyTaskArea();
    }
  }
}

function emptyTaskArea() {
  return `
    <div class="empty-todo">
      <p>No tasks To do</p>
    </div>
  `;
}


// Function that the search-baer should get a border-color blue, when the sarch-inout is clicked
let searchBar = document.getElementById("search-bar");

document.addEventListener("click", (event) => {
  if (!searchBar.contains(event.target)) {
    searchBar.style.borderColor = "var(--user-grey)";
  } else {
    searchBar.style.borderColor = "var(--reg-blue)";
  }
});

function createTaskElement(task, index, section ) {
  return /*html */ `
    <div class="cards" id="card${index}" onclick="popUpTask(${section}, ${index})">
      <span class="topic">${task.category}</span>
      <div class="frame">
        <h4 class="title">${task.title}</h4>
        <p class="content">${task.description}</p>
      </div>
      ${createProgressBar(task)}
      ${createSelectedContacts(task, index)}
    </div>
  `;
}

function createProgressBar(task) {
  const finishedSubTasks = 0; // Check if task and task.subtasks are defined
  const lengthOfSubs = task.subTask ? task.subTask.length : 0; // Check if task and task.subtasks are defin

  return /*html */ `
    <div class="progress-bar">
      <progress max="100" value="${lengthOfSubs}"></progress>
      <div class="subtask-amount"><span>${finishedSubTasks}/${lengthOfSubs}</span> Subtasks</div>
    </div>
  `;
}

function createSelectedContacts(task, index) {
  const profile = task.selectedContacts
    .map((contact, subIndex) => {
      return `<span style="background-color: ${contact.bColor}" class="profile" style="z-index:${subIndex}">${contact.shortName}</span>`;
    })
    .join("");

  return /*html */ `
    <div class="assign-conatiner" id="assign-container${index}">
      <div class="assigned-person">
        ${profile}
      </div>
      ${createPriorityIcon(task)}
    </div>
  `;
}

function createPriorityIcon(task) {
  let icon;
  const prio = task.priority;
  if (prio === "urgent") {
    icon = `<span> <i class="bi bi-chevron-double-up"></i></span>`;
  } else if (prio === "medium") {
    icon = `<span> <i class="fa-solid fa-equals"></i></span>`;
  } else {
    icon = `<span> <i class="bi bi-chevron-double-down"></i></span>`;
  }

  return icon;
}


function popUpTask(section, index) {
  const selectedTask = addedTasks[0][section.id][index];
  
}


