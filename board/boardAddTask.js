

let formDiv = document.getElementById("form-div");

function closeMobileAddtask() {
  formDiv.style.transform = "translateX(150%)";
}

function openMobileAddTask(conatainerId){
  formDiv.style.transform = "translateX(0%)";
  conatainerIdForMobileAddTask = conatainerId;
}
