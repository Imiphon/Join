    const assignedContacts = [];
    const selectedContacts = [];
    let tasksForSubtasks = [];



    // Function to show or hide options
    // Function to show or hide options
    function showOptions(event) {
        event.preventDefault();
        let dropdown = document.getElementById('dropdown-options');

        if (dropdown.classList.contains('d-none')) {
            showDropdownOptions();
        } else {
            hideDropdownOptions();
        }

        dropDownTemplates();
    }

    let dropdown = document.getElementById('dropdown-options');

    // Function to show dropdown options
    function showDropdownOptions() {
        document.getElementById('caret-down').style.transform = 'rotate(180deg)';
        document.getElementById('selected-contact').classList.remove('d-none');
        document.getElementById('assigned-div').style.borderBottom = 'solid 1px var(--reg-blue)';
        dropdown.classList.remove('d-none');
    }

    function hideDropdownOptions() {
        document.getElementById('caret-down').style.transform = 'rotate(0deg)';
        document.getElementById('selected-contact').classList.add('d-none');
        document.getElementById('assigned-div').style.borderBottom = '';
        dropdown.classList.add('d-none');
    }


    // Function to populate dropdown with templates
    function dropDownTemplates() {
        let dropdown = document.getElementById('dropdown-options');
        dropdown.innerHTML = '';

        contactArray.forEach((user, index) => {
            const userHtml = `
                <div class="options">
                    <span class="profile" id="profile${index}">${user.initials}</span>
                    <label for="checkbox">${user.name}</label>
                    <input type="checkbox" id="checkbox${index}" value="${user.name}" onclick="checkedUser('${user.initials}','${user.color}', ${index})">
                </div>
            `;
            dropdown.innerHTML += userHtml;
            setBackgroundColor(user, index);
        });
    }



    // Function to set a  background color for a profile
    function setBackgroundColor(user, index) {
        let userBackground = document.getElementById(`profile${index}`);
        userBackground.style.backgroundColor = user.color;
    }


    // Function to rotate the category icon
    // Initialize flags to track categoryIcon

    // let showCategory = false;
    // function rotateIcon() {    
    //     const categoryIcon = document.getElementById('category-caret-down');
    //     showCategory = !showCategory;
    //     categoryIcon.style.transform = showCategory ? 'rotate(180deg)' : 'rotate(0deg)';
    // }

    // Function to open the add task section
    function openAddTask() {
        let subsTaskDiv = document.getElementById('subtask-container');
        subsTaskDiv.innerHTML = tasksTemplate();
        document.getElementById('subtask-value').focus();
    }

    
    let showCategory = false;
    document.addEventListener('click', event => {
         // Function to rotate the category icon
        rotateCategoryIcon(event)

        //Add the blue color of the subtask-wrapper

        blueColorOfSubTasksContainer(event)
    });


    // Function to rotate the category icon

    function rotateCategoryIcon(event){
        let categoryIcon = document.getElementById('category-caret-down');
        if(event.target.id == 'category' & !showCategory){
            categoryIcon.style.transform = "rotate(180deg)";
            showCategory = true
            
        }else if(event.target.id !== 'category' || showCategory === true){
            categoryIcon.style.transform = "rotate(0deg)";
            showCategory = false;
        }
    }

    //add and remove blue colcor of the line from subtasks
    function blueColorOfSubTasksContainer(event){
        let subtaskWrapper = document.getElementById('subtask-wrapper');
        if (event.target.id === 'subtask-value') {
            subtaskWrapper.style.borderBottom = '1px solid var(--reg-blue)';
        } else {
            subtaskWrapper.style.borderBottom = '1px solid var(--user-grey)';
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
        document.getElementById('create-task').click();
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

        const taskData = collectTaskData();
        const task = createTaskObject(taskData);
        saveTask(task);
        clearForm();
        showAssignedContactsInContainer();
        renderAddedTask();
    }

    function clearAddTask() {
        document.getElementById('subtask-value').value = '';
    }

    function collectTaskData() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const category = document.getElementById('category').value;
        const priority = prio;
        const subtasks = tasksForSubtasks;
        const assignedContacts = assignedContacts.map(contact => contact.name);

        return {
            title,
            description,
            date,
            category,
            priority,
            subtasks,
            assignedContacts
        };
    }

    function createTaskObject(taskData) {
        const task = {
            'title': taskData.title,
            'description': taskData.description,
            'date': taskData.date,
            'category': taskData.category,
            'priority': taskData.priority,
            'subTask': taskData.subtasks,
            'assignedContacts': taskData.assignedContacts
        };
        return task;
    }

    function saveTask(task) {
        addedTasks[0]['toDo'].push(task);
    }

    function clearForm(event) {
        event.preventDefault();
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('date').value = '';
        document.getElementById('category').value = 'Select task Category';
        tasksForSubtasks = [];
        resetPriorityButtons();

    }

    function resetPriorityButtons(){
        prioBtns.forEach(btn => {
            btn.style.boxShadow = `0px 0px 4px 0px ${boxShadowColors[0]}`;
        });
    }


    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }


