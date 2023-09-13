// document.addEventListener("DOMContentLoaded", async () => {
//   await loadTasks();
//   await init();
//   const draggables = document.getElementById("card0");
//   console.log(draggables);
// });

async function init() {
  await loadTasks();
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

let topicColor;

function createTaskElement(task, index, section) {
  return /*html */ `
    <div  class="cards draggable" id="card${index}" onclick="popUpTask(${section}, ${index})" draggable="true" ondragstart="startDargging(card${index}, ${section})">
      <span  class="topic">${task.category}</span>
      <div class="frame">
        <h4 class="title">${task.title}</h4>
        <p class="content">${task.description}</p>
      </div>
      ${createProgressBar(task, index)}
      ${createSelectedContacts(task, index)}
    </div>
  `;
}

function createProgressBar(task, index) {
  const checkedSubTasks = task.subTask
    ? task.subTask.filter((subtask) => subtask.checked == true)
    : [];

  const finishedSubTasks = checkedSubTasks.length;
  let lengthOfSubs =
    task.subTask && task.subTask.length ? task.subTask.length : 0;
  return /*html */ `
    <div class="progress-bar">
      <progress max="100" value="${
        (finishedSubTasks / lengthOfSubs) * 100
      }"></progress>
      <div class="subtask-amount"><span>${finishedSubTasks}/${lengthOfSubs}</span> Subtasks</div>
    </div>
  `;
}
function createSelectedContacts(task, index) {
  const profile = task.selectedContacts
    .map((contact, subIndex) => {
      topicColor = contact.bColor;
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
  const selectedContainer = addedTasks[0][section.id];
  let showTaskContainer = document.getElementById("show-task-container");
  showTaskContainer.style.display = "flex";
  showTaskContainer.innerHTML = taskPopUpTemplate(selectedTask, index, section);
}

function taskPopUp(event) {
  event.stopPropagation();
}

function closeTaskContainer(event) {
  let showTaskContainer = document.getElementById("show-task-container");
  showTaskContainer.style.display = "none";
}

function taskPopUpTemplate(selectedTask, taskIndex, section) {
  let date = selectedTask.date.split("-").join("/");

  return `
        <div class="taskpoUp" id="taskpoUp" onclick="taskPopUp(event)">
          <div class="topic-div" id="topic-div">
            <span class="topic"> ${selectedTask.category} </span>
            <i class="bi bi-x" onclick="closeTaskContainer(event)"></i>
          </div>

          <span class="title"> ${selectedTask.title} </span>

          <span class="description"
            >${selectedTask.description}</span
          >

          <div class="date-div info-div">
            <span>Due date:</span>
            <span>${date}</span>
          </div>

          ${prioTemplate(selectedTask, taskIndex)}

          ${assignToTemplate(selectedTask, taskIndex)}

          ${subtasksTemplates(selectedTask, taskIndex, section)}

          <div class="edit-div">
            <span onclick="deleteTask(${taskIndex},'${section.id}')">
              <i class="bi bi-trash"></i>
              <p>Delete</p>
            </span>

            <span onclick="edittask()">
              <i class="bi bi-pencil"></i>
              <p>Edit</p>
            </span>
          </div>
        </div>

        


  `;
}

function prioTemplate(task) {
  let prio = task.priority;
  let icon;
  let prioName;
  if (prio === "urgent") {
    icon = `<span> <i class="bi bi-chevron-double-up"></i></span>`;
    prioName = prio;
  } else if (prio === "medium") {
    icon = `<span> <i class="fa-solid fa-equals"></i></span>`;
    prioName = prio;
  } else {
    icon = `<span> <i class="bi bi-chevron-double-down"></i></span>`;
    prioName = prio;
  }

  return /*html */ `
    <div class="prio-div info-div">
      <span>Priority:</span>
      <div class="prio-sign">
        <span>${prioName}</span>
        ${icon}
      </div>
    </div>
  `;
}

function assignToTemplate(task) {
  let names = [];
  let lastNames = [];
  let bColors = [];
  let shortNames = [];

  task.selectedContacts.forEach((contact) => {
    names.push(contact.name);
    lastNames.push(contact.lastName);
    bColors.push(contact.bColor);
    shortNames.push(contact.shortName);
  });

  let profilesHTML = "";

  for (let i = 0; i < names.length; i++) {
    profilesHTML += `
      <div class="profiles">
        <span style="background-color: ${bColors[i]}" class="profile">${shortNames[i]}</span>
        <p>${names[i]} ${lastNames[i]}</p>
      </div>
    `;
  }

  return `
    <div class="assign-to info-div">
      <span>Assigned To:</span>
      <div class="profiles-div">
        ${profilesHTML}
      </div>
    </div>
  `;
}

function subtasksTemplates(task, taskIndex, section) {
  let subNames = [];
  let subHtml = "";
  sectionId = section.id;
  task.subTask.forEach((sub, index) => {
    subNames.push(sub.name);
  });

  for (let i = 0; i < subNames.length; i++) {
    const subtaskID = `subtask${i}`;
    const checkedValue = task.subTask[i].checked;
    subHtml += `
      <div class="subtask">
        <label for="${subtaskID}">
          <input type="checkbox" ${
            checkedValue ? "checked" : ""
          } name="${sectionId}" id="${subtaskID}" onclick="updateSubtask(${taskIndex}, ${i}, '${sectionId}')"/>
          <span style="border-radius: 5px" class="costum-checkbox"></span>
        </label>
        <p class="subtask-text">${subNames[i]}</p>
      </div>
    `;
  }

  return `
    <div class="subtasks-div assign-to info-div">
      <span>Subtasks:</span>
      <div class="subasks profiles">
        ${subHtml}
      </div>
    </div>
  `;
}

function updateSubtask(taskIndex, subtaskIndex, sectionId) {
  let task = addedTasks[0][sectionId][taskIndex];
  let subtask = task.subTask[subtaskIndex];
  subtask.checked = !subtask.checked;
  saveTasks();
  renderTaskList(sectionId, addedTasks);
}

function deleteTask(taskIndex, section) {
  addedTasks[0][section].splice(taskIndex, 1);
  console.log(addedTasks[0][section].splice(taskIndex, 1));
  saveTasks();
  closeTaskContainer();
  renderTaskList(section, addedTasks);
}

// Drag and drop

// document.addEventListener("DOMContentLoaded", async () => {
//   await init();
//   let allTasks = document.querySelectorAll(".allstsks"); // Korrekte Klasse "allstsks"
//   let draggables = document.querySelectorAll(".draggable");

//   draggables.forEach((draggable) => {
//     draggable.addEventListener("dragstart", () => {
//       draggable.classList.add("dragging");
//     });

//     draggable.addEventListener("dragend", () => {
//       draggable.classList.remove("dragging");
//     });
//   });
//   containers.forEach((container) => {
//     container.addEventListener("dragover", (e) => {
//       allTasks.classList.add("highlighted");
//       e.preventDefault();
//       const draggable = document.querySelector(".dragging");
//       container.prepend(draggable);
//     });

//     container.addEventListener("dragleave", () => {
//       allTasks.classList.remove("highlighted");
//     });

//     allTasks.addEventListener("dragend", () => {
//       container.classList.remove("highlighted");
//     });
//   });
// });

let currentDargedElement;

function startDargging(id, secion){
 currentDargedElement  = id;

 console.log(currentDargedElement)
}