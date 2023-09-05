const assignedContacts = [];
const selectedContacts = [];


// Function to show or hide options
function showOptions() {
    let dropdown = document.getElementById('dropdown-options');

    if (dropdown.classList.contains('d-none')) {
        // Rotate the caret icon
        document.getElementById('caret-down').style.transform = 'rotate(180deg)';
        document.getElementById('selected-contact').classList.remove('d-none');
        // Remove 'd-none' class to show dropdown options
        dropdown.classList.remove('d-none');
        // Add a border to 'assigned-div'
        document.getElementById('assigned-div').style.borderBottom = 'solid 1px var(--reg-blue)';
        showedOptions = true;
    } else {
        // Add 'd-none' class to hide dropdown options
        dropdown.classList.add('d-none');
        // Remove the border from 'assigned-div'
        document.getElementById('assigned-div').style.borderBottom = '';
        showedOptions = false;
        // Reset the caret icon rotation
        document.getElementById('caret-down').style.transform = 'rotate(0deg)';
        document.getElementById('selected-contact').classList.add('d-none');
    }

    // Call the dropDownTemplates function
    dropDownTemplates();
}

// Function to populate dropdown with templates
function dropDownTemplates() {
    let dropdown = document.getElementById('dropdown-options');
    dropdown.innerHTML = '';

    contactArray.forEach((user, index) => {
        dropdown.innerHTML += `
        <div class="options">
        <span class="profile" id="profile${index}">${user.initials}</span>
        <label for="checkboc">${user.name}</label>
        <input type="checkbox" id="checkbox${index}" value="${user.name}" onclick="checkedUser('${user.initials}','${user.color}', ${index})"} onclick>
        </div>
        `
        // Set a random background color for the profile
        setBackgroundColor(user, index);
    });
}

// Array of possible colors for profiles
// const colors = [
//     "red",
//     "blue",
//     "green",
//     "orange",
//     "purple",
//     "pink",
//     "cyan",
//     "magenta",
//     "brown",
// ];

// Function to set a random background color for a profile
function setBackgroundColor(user,index) {
    let userBackground = document.getElementById(`profile${index}`);
    userBackground.style.backgroundColor = user.color;
}

// Function to get a random color from the colors array
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to get both of the letters of the user names;
// function showShortName(userName, userLastName){
//    firstNameFirstLetter = userName.charAt(0);
//    LastNameFirstLetter = userLastName.charAt(0);
//    return firstNameFirstLetter + LastNameFirstLetter;
// }

// Initialize flags to track categoryIcon
let showCategory = false;

// Function to rotate the category icon
function rotateIcon() {
    if (showCategory === false) {
        document.getElementById('category-caret-down').style.transform = 'rotate(180deg)';
        showCategory = true;
    } else {
        document.getElementById('category-caret-down').style.transform = 'rotate(0deg)';
        showCategory = false;
    }
}

// Function to open the add task section
function openAddTask() {
    let subsTaskDiv = document.getElementById('subtask-container');
    subsTaskDiv.innerHTML = tasksTemplate();
    document.getElementById('subtask-value').focus();
}

//Remove the blue color of the subtask-wrapper

let subtaskWrapper = document.getElementById('subtask-wrapper');
let subsTaskDiv = document.getElementById('subtask-container');



subsTaskDiv.addEventListener('click', (event) => {
    event.stopPropagation(); // Stoppen Sie die Propagierung des Klickereignisses
    subtaskWrapper.style.borderBottom = '1px solid var(--reg-blue)';
});

document.addEventListener('click', () => {
    subtaskWrapper.style.borderBottom = '1px solid var(--user-grey)';
});

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
    document.getElementById('create-task').click();
}

// Function to programmatically click the clear task button
function activeClearTaskBtn() {
    document.getElementById('clear-task').click();
}


let prio; //To save the priority-value


// Function to set priority and update it
const boxShadowColors = [
    '#00000029', // default color of the box-shadow
    '#fb4746',
    '#FFBB2B',
    '#1FD7C1'
]

const prioBtns = document.querySelectorAll('.prio-values span');
let selectedIndex = -1;
prioBtns.forEach((btn, index)=>{
    btn.addEventListener('click', ()=>{
        if(selectedIndex !== -1){
            prioBtns[selectedIndex].style.boxShadow = `0px 0px 4px 0px ${boxShadowColors[0]}`;
        }
        selectedIndex = index;

        const boxShadowColor = boxShadowColors[index + 1];
        btn.style.boxShadow = `0px 0px 4px 0px ${boxShadowColor}`;
        
        // Update the value of priority
    })
})

// Function to update the value of priority
function setPrio(value) {
    prio = value;
}

// Function to define the assigned user and push the name to the "assignedontacts"-Array to show them in the "selected-user" container and push also the selected contacts to the 'selectedContacts'

function checkedUser(userInitials, bColor, index){
    const checkbox = document.getElementById(`checkbox${index}`);
    const userName = checkbox.value;
    if(checkbox.checked){
        assignedContacts.push({'shortName': userInitials, 'bColor': bColor});
        selectedContacts.push({'shortName': userInitials, 'bColor': bColor, name: userName});
       
     }else{
        const indexToRemove = assignedContacts.findIndex(contact => contact.shortName === userInitials);
        if(indexToRemove !== -1){
            assignedContacts.splice(indexToRemove, 1);
            selectedContacts.splice(indexToRemove, 1);
        }
    }
        showAssignedContactsInContainer()
            console.log(selectedContacts)


}

function selectedContact(userInitials,bColor, index) {
    const checkbox = document.getElementById(`checkbox${index}`);
    const userName = checkbox.value;

    if (checkbox.checked) {
        // Wenn das Kontrollkästchen ausgewählt ist, fügen Sie den Benutzernamen hinzu
        selectedContacts.push({
            initials: userInitials,
            color: bColor,
            name: userName
        });
    } else {
        // Wenn das Kontrollkästchen abgewählt ist, entfernen Sie den Benutzernamen
        const indexToRemove = selectedContacts.findIndex(contact => contact.name === userName);
        if (indexToRemove !== -1) {
            selectedContacts.splice(indexToRemove, 1);
            showAssignedContactsInContainer();
        }
    }

    console.log(selectedContacts);
}


function showAssignedContactsInContainer(){
    selectedContainer = document.getElementById('selected-contact');
    selectedContainer.innerHTML = "";

    for(let i in assignedContacts){
        profile = assignedContacts[i]['shortName'];
        bColor = assignedContacts[i]['bColor']
        selectedContainer.innerHTML += `
        <span style="background-color:${bColor}; z-index:${i}" class="profile" id="selected-profile${i}">
            ${profile}
        </span>
        `
    }

}

let editingIndex = -1;

// function to add a subtasks;

function addSubtask() {
    let taskValue = document.getElementById('subtask-value').value.trim(); // Trim to remove leading/trailing spaces
    
    if (taskValue !== '') {
        if (editingIndex !== -1) {
            // If editingIndex is not -1, it means we are editing a task
            tasksForSubtasks[editingIndex] = taskValue; // Update the task
            editingIndex = -1; // Reset the index
        } else {
            // Otherwise, add a new task
            tasksForSubtasks.push(taskValue);
        }
        
        renderAddedTask();
        document.getElementById('subtask-value').value = '';
    }
}

function renderAddedTask() {
    let tasksArea = document.getElementById('tasks-area');
    tasksArea.innerHTML = '';

    tasksForSubtasks.forEach((task, i) => {
        tasksArea.innerHTML += `
        <li>
            <p>${task}</p>
            <span>
                <i class="bi bi-pencil" onclick="editTask(${i})"></i>|
                <i class="bi bi-trash" onclick="deleteTask(${i})"></i>
            </span>
        </li>
        `;
    });
}

function deleteTask(i){
    tasksForSubtasks.splice(i, 1); 
    renderAddedTask();
}

function editTask(i){
    let taskValue = document.getElementById('subtask-value');
    taskValue.value = tasksForSubtasks[i];
    tasksForSubtasks.splice(i, 1);
    editingIndex = i;
    renderAddedTask();
    taskValue.focus();
}

function addTask(event) {
    event.preventDefault();
    // Holen Sie sich die Werte aus dem HTML-Formular
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const priority = prio; // Der zuvor festgelegte Prioritätswert
    const subtasks = tasksForSubtasks;

    // Holen Sie sich die ausgewählten Kontakte aus dem assignedContacts Array
    const assignedContacts = assignedContacts.map(contact => contact.name);

    // Erstellen Sie ein JSON-Objekt mit den gesammelten Informationen
    const task = {
        'title': title,
        'description': description,
        'date': date,
        'category': category,
        'priority': priority,
        'subTask': subtasks,
        'assignedContacts': assignedContacts
    };

    addedTasks[0]['toDo'].push(task);

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('category').value = 'Select task Category';
    prioBtns.forEach(btn => {
        btn.style.boxShadow = `0px 0px 4px 0px ${boxShadowColors[0]}`;
    });
    tasksForSubtasks = [];
    showAssignedContactsInContainer();
    renderAddedTask();

    showNotification('Task hinzugefügt');

}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000); // Die Benachrichtigung verschwindet nach 2 Sekunden
}