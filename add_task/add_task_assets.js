let dropdown = document.getElementById("dropdown-options");
let dropdownCategory = document.getElementById("dropdown-category");

/**
 * Function to add each  button of the priority a shadow-color, 
 * to know which one is selected
 * used in resetPriorityButtons()
 */
const prioBtns = document.querySelectorAll(".prio-values span");
let selectedIndex = -1;
prioBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (selectedIndex !== -1) {
      prioBtns[
        selectedIndex
      ].style.boxShadow = `0px 0px 4px 0px ${boxShadowColors[0]}`;
    }
    selectedIndex = index;

    const boxShadowColor = boxShadowColors[index + 1];
    btn.style.boxShadow = `0px 0px 4px 0px ${boxShadowColor}`;
  });
});

/**
 * Saves the array 'addedTasks'
 */

async function saveTasks() {
  let userId = localStorage.getItem("userId");
  await setItem("storedTasks" + userId, JSON.stringify(addedTasks));
}

/**
 * This function clears the form
 * @param {event object} event wer are stopping the this function from its function, to not trigger our from
 */
function clearForm(event) {
  event.preventDefault();
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("date").value = "";
  category = "";
  tasksForSubtasks = [];
  selectedContacts = [];
  assignedContacts = [];
  showAssignedContact();
  dropDownTemplates();
  resetPriorityButtons();
  openAddTask();
}

/**
* Template for the message
*/

function showAddedTask() {
  let newTask = `<p>Task added.</p>`;
  let editedTask = `Task edited.`;
  let message;
  if (editIndex === -1) {
    message = newTask;
  } else {
    message = editedTask;
  }
  showMessage(message);
}

/**
*
* @param {html-code} html - this is html-code to show a message after a task is added
*/
function showMessage(html) {
  let msg = document.getElementById("message");
  msg.innerHTML = html;
  msg.classList.remove("d-none");
  setTimeout(function () {
    msg.classList.add("d-none");
  }, 3000);
  setTimeout(() => {
    toggleButton("board");
    changeLocation();
  }, 3500);
}

/**
 * Reseting the prioBtns
 */
function resetPriorityButtons() {
  prioBtns.forEach((btn) => {
    btn.style.boxShadow = `0px 0px 4px 0px ${boxShadowColors[0]}`;
  });
}

/**
 * 
 * @returns Checks the required fields in add_task.html and returns boolian
 */
function requiredField() {
  let reqContact = document.getElementById("req-contact");
  let reqTask = document.getElementById("req-task");
  let reqPrio = document.getElementById("req-prio");
  if (assignedContacts.length < 1) {
    reqContact.style.display = "flex";
    return false;
  } else {
    reqContact.style.display = "none";
  }
  if (categoryValue === undefined) {
    reqTask.style.display = "flex";
    return false;
  } else {
    reqTask.style.display = "none";
  }
  if (prio === undefined) {
    reqPrio.style.display = "flex";
    return false;
  } else {
    reqPrio.style.display = "none";
  }
}

/**
 * This function saves the array 'categories'
 */

async function saveCategories() {
  await setItem("storedCategories", JSON.stringify(categories));
}

/**
 * Function to show or hide the options for contacts to assign
 */
function toggleContactContainer() {
  if (dropdown.classList.contains("dropdown-content")) {
    showDropdownOptions();
  } else {
    hideDropdownOptions();
  }
}

/**
 * Calls other functions to rotate the icons from  assign contacts and categories
 */
let showCategory = false;
document.addEventListener("click", (event) => {
  rotateCategoryIcon(event);
  blueColorOfSubTasksContainer(event);
});

/**
 *  Function to rotate the category icon
 * @param {string} event - This event shows which element is clicked, 
 * to select the right icon and rotate it.
 */
function rotateCategoryIcon(event) {
  let categoryIcon = document.getElementById("category-caret-down");
  if (
    (event.target.id == "category-div") & !showCategory ||
    (event.target.id == "category-caret-down") & !showCategory
  ) {
    categoryIcon.style.transform = "rotate(180deg)";
    showCategory = true;
    openCategory();
  } else if (event.target.id !== "category-div" || showCategory === true) {
    categoryIcon.style.transform = "rotate(0deg)";
    showCategory = false;
    closeCategory();
  }
}

/**
 * If the category area is clicked, so the dropdown should be opened
 */
function openCategory() {

  if (dropdownCategory.classList.contains("dropdown-content")) {
    dropdownCategory.classList.remove("dropdown-content");
    dropdownCategory.classList.add("hidden");
    document.getElementById("selected-category").classList.remove("d-none");
  }
}

/**
 * If the category area is clicked, so the dropdown should be closed
 */
function closeCategory() {
  dropdownCategory.classList.add("dropdown-content");
  dropdownCategory.classList.remove("hidden");
}

/**
 * this function renders the categories from the categories array
 */
function showCategoryOptions() {
  dropdownCategory.innerHTML =
    '<div id="addCatHeader" class="options" onclick="addCategory(event)">Add own Category</div>';
  for (let i in categories) {
    dropdownCategory.innerHTML += `
      <div class="options" value="${categories[i]}" onclick="checkedCategory(event, ${i})">${categories[i]}</div>
      `;
  }
}

/**
 * // Function to show dropdown options for contacts to assign
 */
function showDropdownOptions() {
  document.getElementById("caret-down").style.transform = "rotate(180deg)";
  document.getElementById("selected-contact").classList.remove("d-none");
  document.getElementById("assigned-div").style.borderBottom = "solid 1px var(--reg-blue)";
  dropdown.classList.remove("dropdown-content");
  dropdown.classList.add("hidden");
  setTimeout(() => {
    document.addEventListener('click', outsideClickListener);
  }, 1000);
}

/**
 * // Function to start hiding the dropdown options for contacts to assign
 */
function outsideClickListener(event) {
  let isClickInsideDropdown = dropdown.contains(event.target);
  if (!isClickInsideDropdown) {
    hideDropdownOptions();
  }
}

/**
 * Function to hide dropdown options for contacts to assign
 */
function hideDropdownOptions() {
  document.getElementById("caret-down").style.transform = "rotate(0deg)";
  document.getElementById("assigned-div").style.borderBottom = "";
  dropdown.classList.add("dropdown-content");
  dropdown.classList.remove("hidden");
  document.removeEventListener('click', outsideClickListener);
}

/**
* Functions to programmatically click the create task button
*/
function activeCreateTaskBtn() {
  document.getElementById("create-task").click();
}

/**
* Functions to programmatically click the clear-task task button
*/
function activeClearTaskBtn() {
  document.getElementById("clear-task").click();
}

/**
* This function adds a new Task to the board section
* For mobile it's adding from the board-site a new task
* @param {event object} event -is used to prevent the default behavior of an event in JavaScrip
* @param {string} containerId - the name of each array in the addedTasks
*/
function addTask(event, containerId) {
  event.preventDefault();
  if (requiredField() === false) {
    requiredField();
  } else {
    const taskData = collectTaskData();
    const task = createTaskObject(taskData);
    if (containerId) {
      pushTask(task, containerId, editIndex);
    } else {
      pushTask(task, containerIdForMobileAddTask, editIndex);
    }
    clearForm(event);
    showAddedTask();
  }
}

/**
 * This function is Pushing the task to add it to the AddedTask
 * @param {object} task This is the generated Json-object which has to be added
 * @param {number} containerId The name of each section for exaple 'toDo, inProgress etc...'
 * @param {*} editIndex
 */
function pushTask(task, containerId, editIndex) {
  // if editIndex ist not -1, this means we are editing a task
  if (editIndex === -1) {
    addedTasks[0][containerId].push(task);
  } else if (editIndex > -1) {
    addedTasks[0][containerId][editIndex] = task;
  }
  saveTasks();
}

/**
 *  Function to populate dropdown with templates. this methode makes code to look better
 */
function dropDownTemplates() {
  let dropdown = document.getElementById("dropdown-options");
  dropdown.innerHTML = "";
  contactArray.forEach((user, index) => {
    const userHtml = `
      <div class="options" onclick="checkedUser(event, '${user.initials}','${user.name}','${user.lastName}','${user.color}', ${index})">
      <span class="profile" id="profile${index}">${user.initials}</span>
      <span for="checkbox${index}">${user.name} ${user.lastName}</span>
      <input class="checkbox" type="checkbox" id="checkbox${index}" onclick="checkedUser(event, '${user.initials}','${user.name}','${user.lastName}','${user.color}', ${index})">
      </div>
      `;
    dropdown.innerHTML += userHtml;
    setBackgroundColor(user, index);
  });
}

/**
 *
 * @param {event object} event - the event.stopPropagation(); should stop the trigger from the openCategory()
 */

function addCategory(event) {
  event.stopPropagation();
  document.getElementById("new-category").style.display = "flex";
  document.getElementById("new-category").innerHTML = `
  <div class="category-wrapper" id="Categorie-wrapper">
  <input class="category-value" type="text" id="category-value" placeholder="Add new category"> 
  <div id="subtask-icon-container" class="subtask-icon-conatiner">
  <i class="bi bi-x" onclick="clearAddCategoryk()"></i>                |
  <i class="bi bi-check-lg" onclick="addNewcategory()"></i>
  </div>
  `;
}

/**
 * This function renders the added subtasks
 */
function renderAddedTask() {
  let tasksArea = document.getElementById("tasks-area");
  tasksArea.innerHTML = "";

  tasksForSubtasks.forEach((task, i) => {
    tasksArea.innerHTML += `
       <li>
       <p>${task.name}</p>
       <span>
       <i class="bi bi-pencil" id="pencil" onclick="editTask(${i})"></i>|
       <i class="bi bi-trash" onclick="deleteSubTask(${i})"></i>
       </span>
       </li>
       `;
  });
}

/**
 * // Function to generate the HTML template for tasks
 * @returns This function return the html-code for the opendAddTask()
 */
function tasksTemplate() {
  return `
     <div class="subtask" id="subtask">
     <b>Subtasks</b>
     <div class="subtask-wrapper" id="subtask-wrapper">
     <input type="text" id="subtask-value" placeholder="Add new subtask">  
     <div id="subtask-icon-container" class="subtask-icon-conatiner">
     <i class="bi bi-x" onclick="clearAddTask()"></i>
     |
     <i class="bi bi-check-lg" onclick="addSubtask()"></i>
     </div> 
     </div>
     <ul id="tasks-area" class="tasks"></ul>
     </div>
     `;
}
