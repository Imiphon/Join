// Here, some global variables are declared
let tasksForSubtasks = []; // A list for subtasks
let selectedContacts = []; // A list for selected contacts
let assignedContacts = []; // A list for assigned contacts
let categories = ["Design", "Programming", "Marketing"]; // A list of categories
let categoryValue; // A variable to store the selected category value

/**
 * calling this functions to be loaded from the server
 */
document.addEventListener("DOMContentLoaded", async () => {
  await getContactsFromServerForAddTask();
  await loadTasks();
  await loadCaegories();
  dropDownTemplates();
  getCurrentDate();
});

/**
 * I am saving the array 'addedTasks'
 */

async function saveTasks() {
  let userId = localStorage.getItem("userId");
  await setItem("storedTasks" + userId, JSON.stringify(addedTasks));
}

/**
 * loading the array 'addedTasks'
 */
async function loadTasks() {
  try {
    let userId = localStorage.getItem("userId");
    const loadedTasks = await getItem("storedTasks" + userId);
    if (loadedTasks) {
      addedTasks = JSON.parse(loadedTasks);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * This function saves the array 'categories'
 */

async function saveCategories() {
  await setItem("storedCategories", JSON.stringify(categories));
}

/**
 * loading the array categories from the server
 */
async function loadCaegories() {
  try {
    const loadedCategories = await getItem("storedCategories");
    if (loadedCategories) {
      categories = JSON.parse(loadedCategories);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Also here is the same this saving the array
 */

async function getContactsFromServerForAddTask() {
  try {
    let userId = localStorage.getItem("userId");
    contactArray = JSON.parse(await getItem("contacts" + userId));
  } catch (e) {
    console.info("could not find contacts");
  }
}

/**
 * // Function to show or hide the options for contacts to assign
 */
function showOptions() {
  let dropdown = document.getElementById("dropdown-options");

  if (dropdown.classList.contains("dropdown-content")) {
    showDropdownOptions();
  } else {
    hideDropdownOptions();
  }
}

/**
 * global variable to be called from two different functions
 */
let dropdown = document.getElementById("dropdown-options");

/**
 * // Function to show dropdown options for contacts to assign
 */
function showDropdownOptions() {
  document.getElementById("caret-down").style.transform = "rotate(180deg)";
  document.getElementById("selected-contact").classList.remove("d-none");
  document.getElementById("assigned-div").style.borderBottom =
    "solid 1px var(--reg-blue)";
  dropdown.classList.remove("dropdown-content");
  dropdown.classList.add("hidden");
}

/**
 * Function to hide dropdown options for contacts to assign
 */

function hideDropdownOptions() {
  document.getElementById("caret-down").style.transform = "rotate(0deg)";
  document.getElementById("assigned-div").style.borderBottom = "";
  dropdown.classList.add("dropdown-content");
  dropdown.classList.remove("hidden");
}

/**
 *  Function to populate dropdown with templates. this methode makes code to look better
 */
function dropDownTemplates() {
  let dropdown = document.getElementById("dropdown-options");
  dropdown.innerHTML = "";

  contactArray.forEach((user, index) => {
    const userHtml = `
                    <div class="options">
                    <span class="profile" id="profile${index}">${user.initials}</span>
                    <label for="checkbox${index}">${user.name} ${user.lastName}</label>
                    <input type="checkbox" id="checkbox${index}" onclick="checkedUser('${user.initials}','${user.name}','${user.lastName}','${user.color}', ${index})">
                    </div>
                    `;
    dropdown.innerHTML += userHtml;
    setBackgroundColor(user, index);
  });
}

/**
 * Function to set a  background color for a profile
 * @param {string} user - This is the name of the person which added to the 'options' in the 'dropDownTemplates()'
 * @param {number} index - This is the index of the person which added to the 'options' in the 'dropDownTemplates()'
 */
function setBackgroundColor(user, index) {
  let userBackground = document.getElementById(`profile${index}`);
  userBackground.style.backgroundColor = user.color;
}

/**
 * this fucntion ist calling other functions to rotate the icons from  assign contacts and categories
 */

let showCategory = false;
document.addEventListener("click", (event) => {
  // Function to rotate the category icon
  rotateCategoryIcon(event);

  //Add the blue color of the subtask-wrapper

  blueColorOfSubTasksContainer(event);
});

/**
 *  Function to rotate the category icon
 * @param {string} event - This is  event shows which element is clicked, to select the right icon and rotate ist
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
  let dropdown = document.getElementById("dropdown-category");
  if (dropdown.classList.contains("dropdown-content")) {
    dropdown.classList.remove("dropdown-content");
    dropdown.classList.add("hidden");
    document.getElementById("selected-category").classList.remove("d-none");
  }
}

/**
 * If the category area is clicked, so the dropdown should be closed
 */
function closeCategory() {
  let dropdown = document.getElementById("dropdown-category");
  dropdown.classList.add("dropdown-content");
  dropdown.classList.remove("hidden");
}

/**
 * this function renders the categories from the categories array
 */
function showCategoryOptions() {
  let select = document.getElementById("dropdown-category");
  select.innerHTML =
    '<div class="options" onclick="addCategory(event)">Add category</div>';
  for (let i in categories) {
    select.innerHTML += `
      <div class="options" value="${categories[i]}" onclick="checkedCategory(event, ${i})">${categories[i]}</div>
      `;
  }
}

/**
 * this functions initialize the category
 * @param { event object,} event This line prevents the event from propagating further up the DOM tree. It stops the event from triggering any parent event listeners that might also be listening for the same event. This is commonly used to control event bubbling
 * @param {number} i The i parameter is  used as a convention to represent the index.
 */
function checkedCategory(event, i) {
  event.stopPropagation();
  let category_area = document.getElementById("selected-category");
  category_area.innerHTML = "";
  category_area.innerHTML = categories[i];
  categoryValue = categories[i];
}

/**
 *
 * @param {event object} event - the event.stopPropagation(); should stop the trigger from the openCategory()
 */

function addCategory(event) {
  event.stopPropagation();
  document.getElementById("new-category").style.display = "flex";
  document.getElementById("new-category").innerHTML = `
  <div class="category-wrapper" id="subtask-wrapper">
  <input class="cateory-value" type="text" id="cateory-value" placeholder="Add new category"> 
  <div id="subtask-icon-container" class="subtask-icon-conatiner">
  <i class="bi bi-x" onclick="clearAddCategoryk()"></i>                |
  <i class="bi bi-check-lg" onclick="addNewcategory()"></i>
  </div>
  `;
}

/**
 * This function added new category
 */
function addNewcategory() {
  let catValue = document.getElementById("cateory-value");
  categories.push(catValue.value);
  saveCategories();
  document.getElementById("new-category").style.display = "none";
}

/**
 * this function cleares the text in the input from the  addNewcategory()
 */
function clearAddCategoryk() {
  document.getElementById("cateory-value").value = "";
}

/**
 * //add and remove blue colcor of the line from subtasks
 * @param {event object} event - This event show where i'm so that the color of the div becomes blue
 */
function blueColorOfSubTasksContainer(event) {
  let subtaskWrapper = document.getElementById("subtask-wrapper");
  if (event.target.id === "subtask-value") {
    subtaskWrapper.style.borderBottom = "1px solid var(--reg-blue)";
  } else {
    subtaskWrapper.style.borderBottom = "1px solid var(--user-grey)";
  }
}

/**
 * Function to open the add task section
 */
function openAddTask() {
  let subsTaskDiv = document.getElementById("subtask-container");
  subsTaskDiv.innerHTML = tasksTemplate();
  document.getElementById("subtask-value").focus();
}

/**
 * // Function to generate the HTML template for tasks
 * @returns This function return the html-code for the opedAddTask()
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
                    <ul id="tasks-area" class="tasks-area">

                    </ul>
                    </div>
                    `;
}

/**
 * // Functions to programmatically click the create task button

 */
function activeCreateTaskBtn() {
  document.getElementById("create-task").click();
}

function activeClearTaskBtn() {
  document.getElementById("clear-task").click();
}

/**
 * Function to set priority and update it
 */
const boxShadowColors = [
  "#00000029", // default color of the box-shadow
  "#fb4746",
  "#FFBB2B",
  "#1FD7C1",
];

/**
 * Function to add each  button of the priority a shadow-color, to know which one is selected
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
 * Function to update the value of priority
 * @param {string} value - value, when a button of the priority is clicked
 */
function setPrio(value) {
  prio = value;
}

/**
 * Function to define the assigned user and push the name to the "assignedontacts"-Array to show them in the "selected-user" container and push also the selected contacts to the 'selectedContacts'
 * @param {string} userInitials - this is the shortcut of the checked-users full-name
 * @param {string} userName  - This is the first name of the checked-user
 * @param {string} userLastName - This is the second name of the checked-user
 * @param {string} bColor - This the background-color of each options from the 'assign contact'
 * @param {number} index - This is the index of each user
 */
function checkedUser(userInitials, userName, userLastName, bColor, index) {
  const checkbox = document.getElementById(`checkbox${index}`);
  if (checkbox.checked) {
    assignedContacts.push({
      shortName: userInitials,
      bColor: bColor,
      name: userName,
      lastName: userLastName,
    });
    selectedContacts.push({
      shortName: userInitials,
      bColor: bColor,
      name: userName,
      lastName: userLastName,
    });
  } else {
    const indexToRemove = assignedContacts.findIndex(
      (contact) => contact.shortName === userInitials
    );
    if (indexToRemove !== -1) {
      assignedContacts.splice(indexToRemove, 1);
      selectedContacts.splice(indexToRemove, 1);
    }
  }

  showAssignedContactsInContainer();
}

/**
 * show the assigned contact which are checked
 */
function showAssignedContactsInContainer() {
  selectedContainer = document.getElementById("selected-contact");
  selectedContainer.innerHTML = "";

  for (let i in assignedContacts) {
    profile = assignedContacts[i]["shortName"];

    bColor = assignedContacts[i]["bColor"];
    selectedContainer.innerHTML += `
                    <span style="background-color:${bColor}; z-index:${i}" class="profile" id="selected-profile${i}">
                    ${profile}
                    </span>
                    `;
  }
}

let editingIndex = -1;

/**
 * Function to add a subtasks;
 */
function addSubtask() {
  let taskValue = document.getElementById("subtask-value").value.trim(); // Trim to remove leading/trailing spaces

  if (taskValue !== "") {
    if (editingIndex !== -1) {
      // If editingIndex is not -1, it means we are editing a task
      tasksForSubtasks[editingIndex] = taskValue; // Update the task
      editingIndex = -1; // Reset the index
    } else {
      // Otherwise, add a new task
      tasksForSubtasks.push({
        name: taskValue,
        checked: false,
      });
    }

    renderAddedTask();
    document.getElementById("subtask-value").value = "";
  }
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
                    <i class="bi bi-pencil" onclick="editTask(${i})"></i>|
                    <i class="bi bi-trash" onclick="deleteSubTask(${i})"></i>
                    </span>
                    </li>
                    `;
  });
}

/**
 * THis function is deleting the added subtasks
 * @param {number} i - this is the index of each the added subTasks, to recognize which task should be deleted
 */

function deleteSubTask(i) {
  tasksForSubtasks.splice(i, 1);
  renderAddedTask();
}

/**
 * This function allows to edit the added tasks in the subtask
 * @param {*} i - this is the index of each the added subTasks, to recognize which task should be edited
 */
function editTask(i) {
  let taskValue = document.getElementById("subtask-value");
  taskValue.value = tasksForSubtasks[i];
  tasksForSubtasks.splice(i, 1);
  editingIndex = i;
  renderAddedTask();
  taskValue.focus();
}

let conatainerIdForMobileAddTask;
let editIndex = -1;

/**
 * This function adds a now Task to the board section
 * @param {event object} event -is used to prevent the default behavior of an event in JavaScrip
 * @param {string} containerId - the name of each array in the addedTasks
 */
function addTask(event, containerId) {
  event.preventDefault();
  const taskData = collectTaskData();
  const task = createTaskObject(taskData);
  pushTask(task, containerId, editIndex);
  clearForm(event);
  showAddedTask();
}

/**
 * This function is adding from the board-site a new task
 * @param {event object} event -is used to prevent the default behavior of an event in JavaScrip
 */
function mobAddtask(event) {
  event.preventDefault();
  const taskData = collectTaskData();
  const task = createTaskObject(taskData);
  pushTask(task, conatainerIdForMobileAddTask, editIndex);
  clearForm(event);
  showAddedTask();
}

/**
 * After a task is added, we should switch to the board site
 */
function changeLocation() {
  let boradPage = "http://127.0.0.1:5501/board/board.html";
  window.location.href = boradPage;
}

/**
 * Function to clear the input with that we adding a Subask
 */
function clearAddTask() {
  document.getElementById("subtask-value").value = "";
}

/**
 *
 * @returns This function is collecting all the information from the from and returns to the function addTask()
 */
function collectTaskData() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const category = categoryValue;
  const priority = prio;
  const subtasks = tasksForSubtasks;
  const selectedContact = selectedContacts;
  const progressWidth = 0;

  return {
    title,
    description,
    date,
    category,
    priority,
    subtasks,
    selectedContact,
    progressWidth,
  };
}

/**
 *
 * @param {object} taskData - All infromation from the collectTaskData();
 * @returns This return an Json to add it to the AddedTasks
 */

function createTaskObject(taskData) {
  const task = {
    title: taskData.title,
    description: taskData.description,
    date: taskData.date,
    selectedContacts: taskData.selectedContact,
    category: categoryValue,
    priority: taskData.priority,
    subTask: taskData.subtasks,
    progressWidth: taskData.progressWidth,
  };
  return task;
}

/**
 * This function is Pushing the task to add it to the AddedTask
 * @param {object} task This is the generated Json-object which has to be added
 * @param {number} containerId The name of each section for exaple 'toDo, inProgress etc...'
 * @param {*} editIndex
 */
function pushTask(task, containerId, editIndex) {
  /**
   * if editIndex ist not -1, this means we are editing a task
   */
  if (editIndex === -1) {
    addedTasks[0][containerId].push(task);
  } else if (editIndex > -1) {
    addedTasks[0][containerId][editIndex] = task;
  }
  saveTasks();
}

/**
 * This function clear the from
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
  showAssignedContactsInContainer();
  dropDownTemplates();
  resetPriorityButtons();
  openAddTask();
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
 * This functions allows the user in the 'input ="date"'-field only take a available date, and not a date from past
 */
function getCurrentDate() {
  const toDayDate = new Date();
  const year = toDayDate.getFullYear();
  let month = toDayDate.getMonth() + 1;
  let today = toDayDate.getDate();

  if (month < 10) month = "0" + month;
  if (today < 10) today = "0" + today;

  let minDate = `${year}-${month}-${today}`;
  document.getElementById("date").min = minDate;
  console.log(minDate);
}
