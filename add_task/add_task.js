// Here, some global variables are declared
let tasksForSubtasks = []; // A list for subtasks
let selectedContacts = []; // A list for selected contacts
let assignedContacts = []; // A list for assigned contacts
let categories = ["Design", "Programming", "Marketing"]; // A list of categories
let categoryValue = undefined; // A variable to store the selected category value
let editingIndex = -1;
let containerIdForMobileAddTask;
let editIndex = -1;

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
 * this functions initialize the category and close the board
 * @param { event object,} event This line prevents the event from propagating further up the DOM tree. It stops the event from triggering any parent event listeners that might also be listening for the same event. This is commonly used to control event bubbling
 * @param {number} i The i parameter is  used as a convention to represent the index.
 */
function checkedCategory(event, i) {
  event.stopPropagation();
  let category_area = document.getElementById("selected-category");
  category_area.innerHTML = "";
  category_area.innerHTML = categories[i];
  categoryValue = categories[i];
  closeCategory();
  rotateCategoryIcon(event);
  document.getElementById('req-task').style.display = 'none';
}

/**
 * This function added new category
 */
function addNewcategory() {
  let catValue = document.getElementById("category-value");
  categories.push(catValue.value);
  saveCategories();
  document.getElementById("new-category").style.display = "none";
}

/**
 * this function cleares the text in the input from the  addNewcategory()
 */
function clearAddCategoryk() {
  document.getElementById("category-value").value = "";
  document.getElementById("Categorie-wrapper").style.display = "none";
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
 * Function to set priority and update it
 */
const boxShadowColors = [
  "#00000029", // default color of the box-shadow
  "#fb4746",
  "#FFBB2B",
  "#1FD7C1",
];

/**
 * Function to update the value of priority
 * @param {string} value - value, when a button of the priority is clicked
 */
function setPrio(value) {
  prio = value;
  document.getElementById('req-prio').style.display ='none';
}

/**
 * Sets the contact to assigned contacts or splices
 * If user clicks checkbox directly propagation stops to prevent double check
 * @param {*} event 
 * @param {*} userInitials 
 * @param {*} userName 
 * @param {*} userLastName 
 * @param {*} bColor 
 * @param {*} index 
 */
function checkedUser(event, userInitials, userName, userLastName, bColor, index) {
  if (event.target.type === 'checkbox') {
    event.stopPropagation();
  }
  let checkbox = document.getElementById(`checkbox${index}`);
  let currUser = {
    shortName: userInitials,
    bColor: bColor,
    name: userName,
    lastName: userLastName
  };
  const userIndex = assignedContacts.findIndex(
    contact => contact.shortName === currUser.shortName
  );
  if (userIndex === -1) {
    assignedContacts.push(currUser);
    selectedContacts.push(currUser);
    checkbox.checked = true;
  } else {
    assignedContacts.splice(userIndex, 1);
    selectedContacts.splice(userIndex, 1);
    checkbox.checked = false;
  }
  showAssignedContact();
}

/**
 * show the assigned contact which are checked
 * Ends up with "..." after 4 elements 
 */
function showAssignedContact() {
  selectedContainer = document.getElementById("selected-contact");
  selectedContainer.innerHTML = "";
  if (assignedContacts.length !== 0)
  document.getElementById('req-contact').style.display = 'none';

    for (let i in assignedContacts) {
      if (i > 3) {
        selectedContainer.innerHTML += `&nbsp...`;
        break; 
      }
      profile = assignedContacts[i]["shortName"];
  
      bColor = assignedContacts[i]["bColor"];
      selectedContainer.innerHTML += `
         <span style="background-color:${bColor}; z-index:${i}" class="profile" id="selected-profile${i}">
         ${profile}
         </span>
         `;
    }
  }


/**
 * Function to add a subtasks;
 */
function addSubtask() {
  let taskValue = document.getElementById("subtask-value").value.trim(); // Trim to remove leading/trailing spaces

  if (taskValue !== "") {
    if (editingIndex !== -1) {
      taskValue = {
        name: taskValue,
        checked: false,
      };

      tasksForSubtasks.push(taskValue);
      editingIndex = -1;
    } else {
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
  taskValue.value = tasksForSubtasks[i].name;
  console.log(tasksForSubtasks)
  tasksForSubtasks.splice(i, 1);
  editingIndex = i;
  renderAddedTask();
  taskValue.focus();
}

/**
 * After a task is added, we should switch to the board site
 */
function changeLocation() {
  let boradPage =
    "../board/board.html";
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
 * @returns This function is collecting all the informations from the form and returns to the function addTask()
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
 * @param {object} taskData - All infromations from the collectTaskData();
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



