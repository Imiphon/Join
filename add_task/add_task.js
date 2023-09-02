let prio;
const assignedContacts = [];

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

    contactArrayFolder.forEach((user, index) => {
        dropdown.innerHTML += `
        <div class="options">
        <span class="profile" id="profile${index}">${showShortName(user.name, user.lastName)}</span>
        <label for="checkboc">${user.name}</label>
        <input type="checkbox" id="checkbox${index}" value="${user.name}" onclick="checkedUser('${user.name}', '${user.lastName}','${user.color}', ${index})"} onclick>
        </div>
        `
        // Set a random background color for the profile
        setRandomBackgroundColor(user,index);
    });
}

// Array of possible colors for profiles
const colors = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "pink",
    "cyan",
    "magenta",
    "brown",
];

// Function to set a random background color for a profile
function setRandomBackgroundColor(user,index) {
    let userBackground = document.getElementById(`profile${index}`);
    userBackground.style.backgroundColor = user.color;
}

// Function to get a random color from the colors array
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to get both of the letters of the user names;
function showShortName(userName, userLastName){
   firstNameFirstLetter = userName.charAt(0);
   LastNameFirstLetter = userLastName.charAt(0);
   return firstNameFirstLetter + LastNameFirstLetter;
}

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

// Function to generate the HTML template for tasks
function tasksTemplate() {
    return `
        <div class="subtask" id="subtask">
            <b>Subtasks</b>
            <div class="subtask-wrapper" id="subtask-wrapper">
                <input type="text" id="subtask-value" placeholder="Add new subtask" required>  
                <div id="subtask-icon-container" class="subtask-icon-conatiner">
                    <i class="bi bi-x" onclick="clearAddTask()"></i>
                    |
                    <i class="bi bi-check-lg" onclick="addTask()"></i>
                </div> 
            </div>
            <div id="tasksarea">

            </div>
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
        setPrio(getPrioValue(index));
    })
})

// Function to update the value of priority
function setPrio(value) {
    prio = value;
}

// Function to define the assigned user and push the name to the "assignedontacts"-Array to show them in the "selected-user" container

function checkedUser(userName, userLastName, bColor, index){
    let chekBoxValue = document.getElementById(`checkbox${index}`).value + " "+userLastName;
    assignedContacts.push(
        {
            'shortName': showShortName(userName, userLastName),
            'bColor': bColor
        });

        console.log(chekBoxValue)
    showAssignedContactsInContainer();
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
