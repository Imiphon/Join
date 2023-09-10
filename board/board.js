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
    if (taskList && taskList.length > 0) {
      for (let j = 0; j < taskList.length; j++) {
        const task = taskList[j];
        container.innerHTML += createTaskElement(task, j);
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

function createTaskElement(task, index) {
  return /*html */ `
    <div class="cards" id="card${index}">
      <span class="topic">${task.title}</span>
      <div class="frame">
        <h4 class="title">${task.description}</h4>
        <p class="content">Build start page with recipe recommendation...</p>
      </div>
      ${createProgressBar(task)}
      ${createSelectedContacts(task, index)}
    </div>
  `;
}

function createProgressBar(task) {
  const progressBar = task.progresWidth;
  const finishedSubTasks = 0; // You may need to calculate this
  const lengthOfSubs = task.subtasks.length;

  return /*html */ `
    <div class="progress-bar">
      <progress max="100" value="${progressBar}"></progress>
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
