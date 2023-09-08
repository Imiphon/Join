// Function that the search-baer should get a border-color blue, when the sarch-inout is clicked
let searchBar = document.getElementById('search-bar');

document.addEventListener('click', event=>{
    if(!searchBar.contains(event.target)){
        searchBar.style.borderColor = 'var(--user-grey)'
    }else{
        searchBar.style.borderColor = 'var(--reg-blue)'

    }
})


function renderTodo() {
    let toDo = addedTasks[0]['toDo'];
    let toDoConatiner = document.getElementById('to-do');
    toDoConatiner.innerHTML = '';
    for(let i in toDo){
        let toDoValues = toDo[i]
        toDoConatiner.innerHTML += tasksTemplate(toDoValues, i);
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    renderTodo()
})

function emptyTaskArea(){
    return `
        <div class="empty-todo">
            <p>No tasks To do</p>
        </div>
    `
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

            <div class="progress-bar">
                <progress max="100" value="50"></progress>
                <div class="subtask-amount"><span>1/2</span> Subtasks</div>
            </div>

            <div class="assign-conatiner">
                <div class="assigned-person">
                    <span class="profile">kl</span>
                    <span  class="profile">kl</span>
                    <span class="profile">kl</span>
                </div>
                <i class="fa-solid fa-equals"></i>
            </div>
    </div>
`
}