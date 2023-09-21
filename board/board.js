/**
 * Initializes the application.
 */
async function init() {
  await loadTasks();
  renderTaskList("toDo", addedTasks);
  renderTaskList("inProgress", addedTasks);
  renderTaskList("awaitFeedback", addedTasks);
  renderTaskList("done", addedTasks);
}

/**
 * Renders a list of tasks in a specified container.
 * @param {string} containerId - The ID of the container where tasks should be rendered.
 * @param {Array} tasks - An array of tasks to render.
 */
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

/**
 * Generates HTML for an empty task area.
 * @returns {string} - HTML representing an empty task area.
 */
function emptyTaskArea() {
  return `
    <div class="empty-todo">
      <p>No tasks added</p>
    </div>
  `;
}

/**
 * Changes the border color of the search bar when it's clicked.
 */
let searchBar = document.getElementById("search-bar");

document.addEventListener("click", (event) => {
  if (!searchBar.contains(event.target)) {
    searchBar.style.borderColor = "var(--user-grey)";
  } else {
    searchBar.style.borderColor = "var(--reg-blue)";
  }
});

let topicColor;

/**
 * Creates an HTML element representing a task.
 * @param {object} task - The task object to create an element for.
 * @param {number} index - The index of the task.
 * @param {object} section - The section object.
 * @returns {string} - HTML representation of the task element.
 */

function createTaskElement(task, index, section) {
  // ... Function implementation
  return /*html */ `
    <div  class="cards draggable" id="card${index}" onclick="popUpTask(${section}, ${index})" draggable="true" ondragstart="startDargging(event, ${index}, ${section})">
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

/**
 * Creates an HTML progress bar element based on task subtasks.
 * @param {object} task - The task object.
 * @param {number} index - The index of the task.
 * @returns {string} - HTML representation of the progress bar.
 */
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

/**
 * Creates HTML elements for selected contacts in a task.
 * @param {object} task - The task object.
 * @param {number} index - The index of the task.
 * @returns {string} - HTML representation of selected contacts.
 */

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

/**
 * Creates a priority icon based on task priority.
 * @param {object} task - The task object.
 * @returns {string} - HTML representation of the priority icon.
 */

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

/**
 * Opens a pop-up for a task.
 * @param {object} section - The section object.
 * @param {number} index - The index of the task.
 */

function popUpTask(section, index) {
  const selectedTask = addedTasks[0][section.id][index];
  const selectedContainer = addedTasks[0][section.id];
  let showTaskContainer = document.getElementById("show-task-container");
  showTaskContainer.style.display = "flex";
  showTaskContainer.innerHTML = taskPopUpTemplate(selectedTask, index, section);
}

/**
 * Prevents propagation of an event.
 * @param {Event} event - The event object.
 */

function taskPopUp(event) {
  event.stopPropagation();
}

/**
 * Closes the task container.
 * @param {Event} event - The event object.
 */

function closeTaskContainer(event) {
  let showTaskContainer = document.getElementById("show-task-container");
  showTaskContainer.style.display = "none";
}

/**
 * Generates HTML for a task pop-up.
 * @param {object} selectedTask - The selected task object.
 * @param {number} taskIndex - The index of the task.
 * @param {object} section - The section object.
 * @returns {string} - HTML representation of the task pop-up.
 */

function taskPopUpTemplate(selectedTask, taskIndex, section) {
  let date = selectedTask.date.split("-").join("/");
  subtasksTemplates(selectedTask, taskIndex, section);

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

            <span onclick="edittask(${taskIndex}, '${section.id}')">
              <i class="bi bi-pencil"></i>
              <p>Edit</p>
            </span>
          </div>

        <div class="move-buttons">
        <b>Move To</b>
          <div>
            <button class = "create-task" onclick="moveTaskTo('ToDo', ${taskIndex}, '${section.id}')">To do</button>
            <button class = "create-task" onclick="moveTaskTo('InProgress', ${taskIndex}, '${section.id}')">In progress</button>
            <button class = "create-task" onclick="movetaskTo('awaitFeedBack', ${taskIndex}, '${section.id}')"> Await feedback </button>
            <button class = "create-task" onclick="moveTaskTo('Done', ${taskIndex}, '${section.id}')">Done</button>
          </div?
        </div>
      </div>
  `;
}

/**
 * Generates HTML for task priority.
 * @param {object} task - The task object.
 * @param {number} taskIndex - The index of the task.
 * @returns {string} - HTML representation of the task priority.
 */

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

/**
 * Generates HTML for assigned contacts in a task.
 * @param {object} task - The task object.
 * @param {number} taskIndex - The index of the task.
 * @returns {string} - HTML representation of assigned contacts.
 */
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

/**
 * Generates HTML for subtasks in a task.
 * @param {object} task - The task object.
 * @param {number} taskIndex - The index of the task.
 * @param {object} section - The section object.
 * @returns {string} - HTML representation of subtasks.
 */

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
    if (subNames.length >= 0) {
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
    } else {
      subHtml = "No Subtasks added.";
    }
  }

  return `
    <div class="subtasks-div">
      <span>Subtasks:</span>
      <div class="subasks-profiles">
        ${subHtml}
      </div>
    </div>
  `;
}

/**
 * Updates the subtask state in a task.
 * @param {number} taskIndex - The index of the task.
 * @param {number} subtaskIndex - The index of the subtask.
 * @param {string} sectionId - The ID of the section.
 */

function updateSubtask(taskIndex, subtaskIndex, sectionId) {
  let task = addedTasks[0][sectionId][taskIndex];
  let subtask = task.subTask[subtaskIndex];
  subtask.checked = !subtask.checked;
  saveTasks();
  renderTaskList(sectionId, addedTasks);
}

/**
 * Deletes a task from a section.
 * @param {number} taskIndex - The index of the task.
 * @param {string} section - The section ID.
 */
function deleteTask(taskIndex, section) {
  addedTasks[0][section].splice(taskIndex, 1);
  console.log(addedTasks[0][section].splice(taskIndex, 1));
  saveTasks();
  closeTaskContainer();
  renderTaskList(section, addedTasks);
}

//drog and drop functions

let currentDargedElement;
let currenSection;

/**
 * Initializes drag and drop functionality.
 * @param {Event} event - The drag event.
 * @param {number} id - The ID of the dragged element.
 * @param {object} section - The section object.
 */
async function startDargging(event, id, section) {
  currentDargedElement = id;
  currenSection = section.id;
}

/**
 * Allows dropping of a dragged element.
 * @param {Event} event - The drop event.
 */
function allowDrop(event) {
  event.preventDefault();
}

/**
 * Highlights a container during drag and drop.
 * @param {string} containerId - The ID of the container to highlight.
 */

function highlight(conatinerId) {
  document.getElementById(conatinerId).classList.add("drag-area-highlight");
}

/**
 * Removes highlighting from a container.
 * @param {string} containerId - The ID of the container to remove highlighting from.
 */
function removeHighlight(conatinerId) {
  document.getElementById(conatinerId).classList.remove("drag-area-highlight");
  document
    .getElementById(currenSection)
    .classList.remove("drag-area-highlight");
}

/**
 * Moves a dragged element to a different container.
 * @param {string} containerId - The ID of the target container.
 */
async function moveTo(containerId) {
  document.getElementById(containerId).classList.remove("drag-area-highlight");
  let dragedJson = addedTasks[0][currenSection][currentDargedElement];
  addedTasks[0][containerId].push(dragedJson);
  addedTasks[0][currenSection].splice(currentDargedElement, 1);
  saveTasks();
  await loadTasks();
  await init();
  await renderTaskList(containerId, addedTasks);
}

/**
 * Edits a task.
 * @param {number} taskIndex - The index of the task.
 * @param {string} sectiondId - The ID of the section.
 */
function edittask(taskIndex, sectiondId) {
  conatainerIdForMobileAddTask = sectiondId;
  currentSection = addedTasks[0][sectiondId];
  currentTask = addedTasks[0][sectiondId][taskIndex];
  editIndex = currentSection.indexOf(currentTask);
  formDiv.style.transform = "translateX(0%)";
  document.getElementById("create-task-btn").innerText = "Edit Task";

  showToEdditInner(currentTask);
}

/**
 * Displays task details for editing.
 * @param {object} task - The task object.
 */
function showToEdditInner(task) {
  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;
  document.getElementById("date").value = task.date;
  selectedContact(task);
  categoryValue = task.category;
  document.getElementById("selected-category").innerHTML = task.category;
  setPriority(task);
  ShowaddedTasks(task);
}

/**
 * Selects contacts in the task.
 * @param {object} task - The task object.
 */
function selectedContact(task) {
  for (let i in task.selectedContacts) {
    const contactIndex = findContactIndex(task.selectedContacts[i]);
    if (contactIndex !== -1) {
      document.getElementById(`checkbox${contactIndex}`).checked = true;
      assignedContacts.push(task.selectedContacts[i]);
      selectedContacts.push(task.selectedContacts[i]);

      showOptions();
      showAssignedContactsInContainer();
      // Hier können Sie den Index verwenden, um weitere Aktionen durchzuführen.
    } else {
      console.log("no assigned contacts");
    }
  }
}

/**
 * Finds the index of a contact in the contact array.
 * @param {object} task - The contact object.
 * @returns {number} - The index of the contact, or -1 if not found.
 */
function findContactIndex(task) {
  for (let i = 0; i < contactArray.length; i++) {
    if (contactArray[i].name === task.name) {
      return i; // Index des gefundenen Kontakts
    }
  }
  return -1; // Kontakt wurde nicht gefunden
}

/**
 * Sets the priority of a task.
 * @param {object} task - The task object.
 */
function setPriority(task) {
  prio = task.priority;
  switch (prio) {
    case "urgent":
      document.getElementById("urgent").style.boxShadow =
        "0px 0px 4px 0px #fb4746";
      selectedIndex = 0;
      break;
    case "medium":
      document.getElementById("medium").style.boxShadow =
        "0px 0px 4px 0px #FFBB2B";
      selectedIndex = 1;
      break;
    case "lo":
      document.getElementById("low").style.boxShadow =
        "0px 0px 4px 0px #1FD7C1";
      selectedIndex = 2;
  }
}

/**
 * Displays added tasks for editing.
 * @param {object} task - The task object.
 */
function ShowaddedTasks(task) {
  for (let i in task.subTask) {
    tasksForSubtasks.push(task.subTask[i]);
    openAddTask();
    renderAddedTask();
  }
}

/**
 * Searches for tasks based on user input.
 */
function searchTask() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const allstsks = document.getElementsByClassName("allsTsks");
  for (let i = 0; i < allstsks.length; i++) {
    const tasks = allstsks[i].getElementsByClassName("cards");
    for (let j = 0; j < tasks.length; j++) {
      const task = tasks[j];
      const title = task.querySelector(".title").textContent.toLowerCase();
      const description = task
        .querySelector(".content")
        .textContent.toLowerCase();
      const isVisible =
        title.includes(searchInput) || description.includes(searchInput);
      task.style.display = isVisible ? "flex" : "none";
    }
  }
}
