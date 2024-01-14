

let formDiv = document.getElementById("form-div");

/**
 * Closes the mobile add task form by translating it out of view.
 */
function closeMobileAddtask(event) {
  event.stopPropagation();
  formDiv.style.transform = "translateX(150%)";
}

/**
 * Opens the mobile add task form and sets the target container ID.
 * @param {string} containerId - The ID of the container to add the task to.
 */
function openMobileAddTask(conatainerId){
  formDiv.style.transform = "translateX(0%)";
  containerIdForMobileAddTask = conatainerId;
}
