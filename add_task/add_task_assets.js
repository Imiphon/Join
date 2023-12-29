let dropdown = document.getElementById("dropdown-options");
let dropdownCategory = document.getElementById("dropdown-category");

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
    showAssignedContactsInContainer();
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
 * Reseting the prioBtns
 */
function resetPriorityButtons() {
    prioBtns.forEach((btn) => {
      btn.style.boxShadow = `0px 0px 4px 0px ${boxShadowColors[0]}`;
    });
  }

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
    '<div class="options" onclick="addCategory(event)">Add category</div>';
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
 * Functions to programmatically click the create task button
 */
function activeCreateTaskBtn() {
    document.getElementById("create-task").click();
  }
  
  function activeClearTaskBtn() {
    document.getElementById("clear-task").click();
  }