let tasksForSubtasks = [];
let selectedContacts = [];
let assignedContacts = [];
let categories = ["Design", "Programming", "Marketing"];
let categoryValue;


document.addEventListener("DOMContentLoaded", async () => {
  await getContactsFromServerForAddTask();
  await loadTasks();
  await loadCaegories();
  dropDownTemplates();
});

async function saveTasks() {
  await setItem("storedTasks", JSON.stringify(addedTasks));
}

async function loadTasks() {
  try {
    const loadedTasks = await getItem("storedTasks");
    if (loadedTasks) {
      addedTasks = JSON.parse(loadedTasks);
    }
  } catch (error) {
    console.log(error);
  }
}

async function saveCategories() {
  await setItem("storedCategories", JSON.stringify(categories));
}

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

async function getContactsFromServerForAddTask() {
  try {
    contactArray = JSON.parse(await getItem("contacts"));
  } catch (e) {
    console.info("could not find contacts");
  }
}

// Function to show or hide options
// Function to show or hide options
function showOptions() {
  let dropdown = document.getElementById("dropdown-options");

  if (dropdown.classList.contains("dropdown-content")) {
    showDropdownOptions();
  } else {
    hideDropdownOptions();
  }
}

let dropdown = document.getElementById("dropdown-options");

// Function to show dropdown options
function showDropdownOptions() {
  document.getElementById("caret-down").style.transform = "rotate(180deg)";
  document.getElementById("selected-contact").classList.remove("d-none");
  document.getElementById("assigned-div").style.borderBottom =
    "solid 1px var(--reg-blue)";
  dropdown.classList.remove("dropdown-content");
  dropdown.classList.add("hidden");
}

function hideDropdownOptions() {
  document.getElementById("caret-down").style.transform = "rotate(0deg)";
  document.getElementById("assigned-div").style.borderBottom = "";
  dropdown.classList.add("dropdown-content");
  dropdown.classList.remove("hidden");
}

// Function to populate dropdown with templates
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

document.addEventListener("DOMContentLoaded", () => {
  dropDownTemplates();
});

// Function to set a  background color for a profile
function setBackgroundColor(user, index) {
  let userBackground = document.getElementById(`profile${index}`);
  userBackground.style.backgroundColor = user.color;
}

// Function to open the add task section
function openAddTask() {
  let subsTaskDiv = document.getElementById("subtask-container");
  subsTaskDiv.innerHTML = tasksTemplate();
  document.getElementById("subtask-value").focus();
}

let showCategory = false;
document.addEventListener("click", (event) => {
  // Function to rotate the category icon
  rotateCategoryIcon(event);

  //Add the blue color of the subtask-wrapper

  blueColorOfSubTasksContainer(event);
});

// Function to rotate the category icon

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

function openCategory() {
  let dropdown = document.getElementById("dropdown-category");
  if (dropdown.classList.contains("dropdown-content")) {
    dropdown.classList.remove("dropdown-content");
    dropdown.classList.add("hidden");
    document.getElementById("selected-category").classList.remove("d-none");
  }
}

function closeCategory() {
  let dropdown = document.getElementById("dropdown-category");
  dropdown.classList.add("dropdown-content");
  dropdown.classList.remove("hidden");
}

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

function checkedCategory(event, i) {
  event.stopPropagation();
  let category_area = document.getElementById("selected-category");
  category_area.innerHTML = "";
  category_area.innerHTML = categories[i];
  categoryValue = categories[i];
}

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

function addNewcategory() {
  let catValue = document.getElementById("cateory-value");
  categories.push(catValue.value);
  document.getElementById("new-category").style.display = "none";
}

function clearAddCategoryk() {
  document.getElementById("cateory-value").value = "";
}

//add and remove blue colcor of the line from subtasks
function blueColorOfSubTasksContainer(event) {
  let subtaskWrapper = document.getElementById("subtask-wrapper");
  if (event.target.id === "subtask-value") {
    subtaskWrapper.style.borderBottom = "1px solid var(--reg-blue)";
  } else {
    subtaskWrapper.style.borderBottom = "1px solid var(--user-grey)";
  }
}

// Function to generate the HTML template for tasks
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

// Function to programmatically click the create task button
function activeCreateTaskBtn() {
  document.getElementById("create-task").click();
}

function activeClearTaskBtn() {
  document.getElementById("clear-task").click();
}

// Function to set priority and update it
const boxShadowColors = [
  "#00000029", // default color of the box-shadow
  "#fb4746",
  "#FFBB2B",
  "#1FD7C1",
];

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

    // Update the value of priority
  });
});

// Function to update the value of priority
function setPrio(value) {
  prio = value;
}

// Function to define the assigned user and push the name to the "assignedontacts"-Array to show them in the "selected-user" container and push also the selected contacts to the 'selectedContacts'

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
  console.log(selectedContacts);
}

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

// function to add a subtasks;

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

function deleteSubTask(i) {
  tasksForSubtasks.splice(i, 1);
  renderAddedTask();
}

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

function addTask(event, containerId) {
  event.preventDefault();
  const taskData = collectTaskData();
  const task = createTaskObject(taskData);
  pushTask(task, containerId, editIndex);
  clearForm(event);
  showAddedTask();
}

function mobAddtask(event) {
  event.preventDefault();
  const taskData = collectTaskData();
  const task = createTaskObject(taskData);
  pushTask(task, conatainerIdForMobileAddTask, editIndex);
  clearForm(event);
  showAddedTask();
}

function changeLocation() {
  let boradPage = "http://127.0.0.1:5501/board/board.html";
  window.location.href = boradPage;
}

function clearAddTask() {
  document.getElementById("subtask-value").value = "";
}

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

function pushTask(task, containerId, editIndex) {
  if (editIndex === -1) {
    addedTasks[0][containerId].push(task);
  } else if (editIndex > -1) {
    addedTasks[0][containerId][editIndex] = task;
  }
  saveTasks();
}

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

function resetPriorityButtons() {
  prioBtns.forEach((btn) => {
    btn.style.boxShadow = `0px 0px 4px 0px ${boxShadowColors[0]}`;
  });
}

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

function showAddedTask() {
  let html = `
           <p>Task added</p> 
            `;
  showMessage(html);
}
