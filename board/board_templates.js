let topicColor;

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
  return /*html*/ `
    <div class="progress-bar">
      <progress max="100" value="${(finishedSubTasks / lengthOfSubs) * 100
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
  let contactsHtml = task.selectedContacts
    .slice(0, 4).map((contact, subIndex) => {
      return `<span style="background-color: ${contact.bColor}" class="profile" style="z-index:${subIndex}">${contact.shortName}</span>`;
    })
    .join("");

  if (task.selectedContacts.length > 4) {
    contactsHtml += "&nbsp...";
  }

  return /*html */ `
    <div class="assign-conatiner" id="assign-container${index}">
      <div class="assigned-person">
        ${contactsHtml}
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
 * Converts a date from 'YYYY-MM-DD' format to 'YYYY/MM/DD'.
 * @param {string} dateStr - The date string in 'YYYY-MM-DD' format.
 * @returns {string} - The date string in 'YYYY/MM/DD' format.
 */
function formatDate(dateStr) {
  return dateStr.split("-").join("/");
}

/**
 * Generates HTML for 'Move To' buttons in the task pop-up.
 * @param {object} selectedTask - The selected task object.
 * @param {number} taskIndex - The index of the task.
 * @param {object} section - The section object.
 * @returns {string} - HTML for 'Move To' buttons.
 */
function generateMoveToButtons(selectedTask, taskIndex, section) {
  const availableSections = ["To Do", "In Progress", "Await Feedback", "Done"];
  return availableSections
    .filter((targetSection) => targetSection !== section.id)
    .map(
      (targetSection) => `
        <button class="create-task" onclick="moveTaskTo('${targetSection}', ${taskIndex}, '${section.id}', '${section}')">${targetSection}</button>
      `
    )
    .join("");
}

/**
 * Generates HTML for a task pop-up.
 * @param {object} selectedTask - The selected task object.
 * @param {number} taskIndex - The index of the task.
 * @param {object} section - The section object.
 * @returns {string} - HTML representation of the task pop-up.
 */
function taskPopUpTemplate(selectedTask, taskIndex, section) {
  let date = formatDate(selectedTask.date);
  subtasksTemplates(selectedTask, taskIndex, section);

  return /*html*/`
    <div class="taskpoUp" id="taskpoUp" onclick="taskPopUp(event)">
      <div class="topic-div" id="topic-div">
        <span class="topic"> ${selectedTask.category} </span>
        <i class="bi bi-x" onclick="closeTaskContainer(event)"></i>
      </div>  
      <span class="title"> ${selectedTask.title} </span>  
      <span class="description">${selectedTask.description}</span>  
      <div class="date-div info-div">
        <span>Due date:</span>
        <span>${date}</span>
      </div>
      ${prioTemplate(selectedTask)}
      ${assignToTemplate(selectedTask)}
      ${subtasksTemplates(selectedTask, taskIndex, section)}
      <div class="move-buttons">
        <b>Move To</b>
        <div id="moveToBtns">
          ${generateMoveToButtons(selectedTask, taskIndex, section)}
        </div>
        <div class="edit-div-frame">
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
        </div>
      </div>
    </div>
  `;
}


/**
 * Determines the icon and name for a given task priority.
 * @param {string} priority - The priority of the task.
 * @returns {{icon: string, prioName: string}} 
 */
function getPriorityDetails(priority) {
  let icon;
  let prioName;

  switch (priority) {
    case "urgent":
      icon = `<span> <i class="bi bi-chevron-double-up"></i></span>`;
      break;
    case "medium":
      icon = `<span> <i class="fa-solid fa-equals"></i></span>`;
      break;
    default:
      icon = `<span> <i class="bi bi-chevron-double-down"></i></span>`;
      break;
  }

  prioName = priority;
  return { icon, prioName };
}

/**
 * Generates HTML for task priority.
 * @param {object} task - The task object.
 * @returns {string} - HTML representation of the task priority.
 */
function prioTemplate(task) {
  const { icon, prioName } = getPriorityDetails(task.priority);

  return `
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
 * Extracts contact details from a task.
 * @param {object} task - The task object.
 * @returns {Array.<{name: string, lastName: string, bColor: string, shortName: string}>} - An array of objects containing contact details.
 */
function extractContactDetails(task) {
  let contactDetails = task.selectedContacts.map(contact => ({
    name: contact.name,
    lastName: contact.lastName,
    bColor: contact.bColor,
    shortName: contact.shortName
  }));

  return contactDetails;
}

/**
 * Generates HTML for assigned contacts in a task.
 * @param {object} task - The task object.
 * @returns {string} - HTML representation of assigned contacts.
 */
function assignToTemplate(task) {
  const contactDetails = extractContactDetails(task);
  let profilesHTML = contactDetails.map(detail => {
    return `
      <div class="profiles">
        <span style="background-color: ${detail.bColor}" class="profile">${detail.shortName}</span>
        <p>${detail.name} ${detail.lastName}</p>
      </div>
    `;
  }).join('');

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
  let sectionId = section.id;
  task.subTask.forEach((sub) => {
    subNames.push(sub.name);
  });

  for (let i = 0; i < subNames.length; i++) {
    const subtaskID = `subtask${i}`;
    const checkedValue = task.subTask[i].checked;
    if (subNames.length >= 0) {
      subHtml += `
        <div class="subtask">
          <label for="${subtaskID}">
            <input type="checkbox" ${checkedValue ? "checked" : ""
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
