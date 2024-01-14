
//drog and drop functions
let currentDargedElement;
let currenSection;

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
    const taskList = tasks[i][containerId]; 
    if (taskList && taskList.length > 0) {
      for (let j = 0; j < taskList.length; j++) {
        const task = taskList[j];
        container.innerHTML += createTaskElement(task, j, containerId);
      }
    } else {
      container.innerHTML = emptyTaskArea();
    }
  }
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
  containerIdForMobileAddTask = sectiondId;
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

      toggleContactContainer();
      showAssignedContact();
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

/**
 * This function moves the task to another area.
 * @param {string} moveToThisSection This is the name of the section or the array, where we want to move our task, based on the button
 * @param {number} taskIndex This is the index of the task
 * @param {string} actualSection This is the name of the sections, where our task is in
 */

function moveTaskTo(moveToThisSection, taskIndex, actualSection) {
  let popUp = document.getElementById("show-task-container");
  let task = addedTasks[0][actualSection][taskIndex];

  addedTasks[0][moveToThisSection].push(task);
  addedTasks[0][actualSection].splice(taskIndex, 1);
  saveTasks();
  init();
  popUp.style.display = "none";
}