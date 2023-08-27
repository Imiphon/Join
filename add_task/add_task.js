let showedOptions = false;
let showCategory = false
function showOptions(){
    if(showedOptions === false){
        document.getElementById('caret-down').style.transform = 'rotate(180deg)'
        document.getElementById('dropdown-options').classList.remove('d-none')
        document.getElementById('assigned-div').style.borderBottom = 'solid 1px var(--reg-blue)';
        showedOptions = true;
    } else{
        document.getElementById('dropdown-options').classList.add('d-none')
        document.getElementById('assigned-div').style.borderBottom = ''
        showedOptions = false;
        document.getElementById('caret-down').style.transform = 'rotate(0deg)'

    }

}

function rotateIcon(){
    if(showCategory === false){
        document.getElementById('category-caret-down').style.transform = 'rotate(180deg)'
        showCategory = true;
    } else{
        document.getElementById('category-caret-down').style.transform = 'rotate(0deg)'
        showCategory = false;

    }
}

function openAddTask(){
    let subsTaskDiv = document.getElementById('subtask-container');
    subsTaskDiv.innerHTML = tasksTemplate();
    document.getElementById('subtask-value').focus();

}


function tasksTemplate(){
    return `
        <div class="subtask" id="subtask">
            <b>Subtasks</b>
            <div class="subtask-wrapper" id="subtask-wrapper">
                <input type="text" id="subtask-value" placeholder="Add new subtask" required>  
                <div id="subtask-icon-conatiner">
                    <i class="bi bi-x" onclick="clearAddTask()"></i>
                    |
                    <i class="bi bi-check-lg" onclick="addTask()"></i>
                </div> 
            </div>
            <div id="tasksarea">

            </div>
        </div>
    `
}

function activeCreateTaskBtn(){
    document.getElementById('create-task').click();
}

function activeClearTaskBtn(){
    document.getElementById('clear-task').click();
}