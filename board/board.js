// Function that the search-baer should get a border-color blue, when the sarch-inout is clicked
let searchBar = document.getElementById("search-bar");

document.addEventListener("click", (event) => {
  if (!searchBar.contains(event.target)) {
    searchBar.style.borderColor = "var(--user-grey)";
  } else {
    searchBar.style.borderColor = "var(--reg-blue)";
  }
});

function renderTodo() {
  let toDoContainer = document.getElementById("to-do");
  toDoContainer.innerHTML = "";

  for (let i = 0; i < addedTasks.length; i++) {
    if (
      addedTasks[i] &&
      addedTasks[i]["toDo"] &&
      addedTasks[i]["toDo"].length > 0
    ) {
      let toDo = addedTasks[i]["toDo"];
      for (let j = 0; j < toDo.length; j++) {
        let toDoValues = toDo[j];
        toDoContainer.innerHTML += tasksTemplate(toDoValues, i);
        subtaskTemplates(toDoValues, i);
      }
    } else {
      toDoContainer.innerHTML = emptyTaskArea();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderTodo();
});

function emptyTaskArea() {
  return `
        <div class="empty-todo">
            <p>No tasks To do</p>
        </div>
    `;
}

function tasksTemplate(toDoValues, i) {
  return /*html */ `
        <div class="cards" id = "card${i}">
            <span class="topic">${toDoValues.title}</span>

            <div class="frame">
                <h4 class="title">
                  ${toDoValues.description}
                </h4>

                <p class="content">
                    Build start page with recipe recommendation...
                </p>
            </div>


            ${showSelectedContacts(toDoValues, i)}
    </div>
`;
}

function progressBarTemplate(toDoValues, i) {
  let progressbar = toDoValues.progresWidth;
  let finishedSubTasks = 0;
  let lenghOfSubs = toDoValues.subtasks.length;
  return /*html */ `
          <div class="progress-bar" id="progress-bar${i}">
            <progress max="100" value="${progressbar}"></progress>
            <div class="subtask-amount"><span>${finishedSubTasks}/${lenghOfSubs}</span> Subtasks</div>
          </div>
  `;
}

function showSelectedContacts(toDoValues, i) {
  let profile = [];
  for (let i in toDoValues.selectedContacts) {
    let selected = toDoValues.selectedContacts[i];
    profile.push(
      `<span class="profile" style="z-index:${i}">${selected}</span>`
    );
  }
  return showSelectedContactsTemplates(toDoValues, profile, i);
}

function showSelectedContactsTemplates(toDoValues, profile, i) {
  return /*html */ `
      <div class="assign-conatiner" id="assign-conatiner${i}">
          <div class="assigned-person">
              ${profile.join("")}
          </div>

          ${prioIcon(toDoValues, i)}
      </div>
`;
}

function prioIcon(toDoValues, i) {
  let icon;
  prio = toDoValues.priority;
  if (prio === "urgent") {
    icon = `<span> <i class="bi bi-chevron-double-up"></i></span>`;
  } else if (prio === "medium") {
    icon = `<span> <i class="fa-solid fa-equals"></i></span>`;
  } else {
    icon = `<span> <i class="bi bi-chevron-double-down"></i></span>`;
  }

  return icon;
}

function subtaskTemplates(toDoValues, i) {
  let subs = [];
  for (let i in toDoValues.subtasks) {
    subs.push(toDoValues.subtasks[i]);
  }

  return subs.join();
}
