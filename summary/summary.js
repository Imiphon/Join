document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname;
    if (currentPage.includes("summary")) {
        let secondTime;
        secondTime = checkSecondTime();
        if (window.innerWidth < 1024) {
            showMobWelcome(secondTime);
        } else {
            showDeskWelcome(secondTime);
        }
        console.log(secondTime);
        displayAddedTasksArr();
    }
});

function getMyName() {
    const storedName = localStorage.getItem('myName');
    let myName;
    if (storedName) {
        myName = storedName;
    } else {
        myName = 'dear Guest';
    }
    return myName;
}

/**
 * get or set loginTime from the user
 * After 15 min it says hello again.
 * @returns boolean
 */
function checkSecondTime() {
    let loginTime = localStorage.getItem('loginTime_' + userId);
    let currentTime = new Date().getTime(); // Aktuelle Zeit
    let timeDifference = currentTime - loginTime;
    if (!loginTime || timeDifference > 900000) {
        loginTime = new Date().getTime(); // Aktuelle Zeit in Millisekunden
        localStorage.setItem('loginTime_' + userId, loginTime);
        return false;
    }
    //15 min = 900000 millisec
    if (loginTime && timeDifference <= 900000) {
        return true;
    }
}

function rightTime() {
    const date = new Date();
    const currentHour = date.getHours();
    if (currentHour < 12) {
        welcomeMessage = "Good Morning";
    }
    else if (currentHour < 20) {
        welcomeMessage = "Good afternoon";
    }
    else if (currentHour < 24) {
        welcomeMessage = "Good evening";
    }
    else {
        welcomeMessage = "Welcome";
    }
    return welcomeMessage + `,&nbsp`;
}

/**
* Displays a welcome message on the screen based on the current hour of the day.
*/
async function showMobWelcome(secondTime) {
    if (!secondTime) {
        let welcomeMessage = rightTime();
        let welcomeDiv = document.getElementById('welcomeMsgDiv');
        welcomeDiv.style.opacity = '1';
        document.getElementById('summaryContainer').style.animation = '2s moveSummary ease-in-out';
        document.getElementById("welcomeText").innerHTML = welcomeMessage;
        document.getElementById("welcomeTextUserName").innerHTML = getMyName();
        setTimeout(() => {
            welcomeDiv.style.opacity = '0';
            //welcomeDiv.style.height = '0';
        }, 2000);
    } else {
        document.getElementById('summaryContainer').style.animation = '0.4s moveSummary ease-in-out';
    }
}

async function showDeskWelcome(secondTime) {
    if (!secondTime) {
        welcomeMessage = rightTime();
        document.getElementById("welcomeText").innerHTML = welcomeMessage;
    } else {
        document.getElementById("welcomeText").innerHTML = `An overview for you, &nbsp`;
    }
    document.getElementById("welcomeTextUserName").innerHTML += getMyName();
}

/**
 * Changes the background color of the footerPolicyAnchor element.
 * Queries the element with class .footerPolicyAnchor and adds the class 'btnsBackgroundColorActive' to it.
 */
function changeBackgroundColorfooterPolicyAnchor() {
    let footerPolicyAnchor = document.querySelector(".footerPolicyAnchor");
    console.log("footerPolicyAnchor", footerPolicyAnchor);
    footerPolicyAnchor.style.classList.add("btnsBackgroundColorActive");
}

/**
 * Displays the number of tasks in different states in respective HTML elements.
 * - Updates taskInBoardDiv with the length of addedTasks array.
 * - Updates taskInProgressDiv with the number of 'inProgress' tasks in addedTasks.
 * - Updates taskAwaitingFeedback with the number of 'awaitFeedback' tasks in addedTasks.
 * - Updates tasksToDoDivNr with the number of 'toDo' tasks in addedTasks.
 * 
 * count the urgents and set the number into 'tasksUrgent'-field.
 */
async function displayAddedTasksArr() {
    await loadAddedTasks();
    let urgentCount = countUrgentTasksInAllCategories();
    let nextDeadline = findNextDeadline();

    updateDisplay(urgentCount, nextDeadline);
}

/**
 * Counts all task with priority 'urgent' and returns result
 * @param {*} tasks 
 * @returns 
 */
function countUrgentTasks(tasks) {
    if (tasks) {
        return tasks.filter(task => task.priority === 'urgent').length;
    } else {
        return 'no urgents';
    }
}

/**
 * returns to displayAddedTasksArr() 
 * @returns 
 */
function countUrgentTasksInAllCategories() {
    return countUrgentTasks(addedTasks[0].inProgress) +
        countUrgentTasks(addedTasks[0].awaitFeedback) +
        countUrgentTasks(addedTasks[0].toDo);
}

/**
 * Is called by displayAddedTasksArr()
 * @param {*} urgentCount 
 * @param {*} nextDeadline 
 */
function updateDisplay(urgentCount, nextDeadline) {
    document.getElementById('tasksUrgent').innerHTML = urgentCount;
    document.getElementById('taskInBoardDiv').innerHTML = countAllTasks();
    document.getElementById('taskInProgressDiv').innerHTML = addedTasks[0].inProgress.length;
    document.getElementById('taskAwaitingFeedback').innerHTML = addedTasks[0].awaitFeedback.length;
    document.getElementById('taskTodo').innerHTML = addedTasks[0].toDo.length;
    document.getElementById('taskDone').innerHTML = addedTasks[0].done.length;
    document.getElementById('deadline').innerHTML = nextDeadline;
}

/**
 * Counts all task returns result to updateDisplay()
 * @param {*} tasks 
 * @returns 
 */
function countAllTasks() {
    return addedTasks[0].inProgress.length +
        addedTasks[0].awaitFeedback.length +
        addedTasks[0].toDo.length +
        addedTasks[0].done.length;
}

/**
 * Called by displayAddedTasksArr() gets all tasks from server 
 * and returns it to displayAddedTasksArr()
 */
async function loadAddedTasks() {
    userId = localStorage.getItem('userId');
    try {
        addedTasks = JSON.parse(await getItem("storedTasks" + userId));
    } catch (e) {
        console.error("Loading error:", e);
    }
}

/**
 * Filters all due dates of categories without 'done'
 * @returns array
 */
function findAllDeadlines() {
    let allDeadlines = [];
    const categories = ['inProgress', 'awaitFeedback', 'toDo'];

    categories.forEach(category => {
        allDeadlines.push(...addedTasks[0][category].map(task => task.date));
    });

    return allDeadlines;
}
/** 
 * @returns first date
 */
function findNextDeadline() {
    const allDeadlines = findAllDeadlines();
    const sortedDeadlines = allDeadlines.sort((a, b) => new Date(a) - new Date(b));
    return sortedDeadlines[0];
}

/**
 * Filters and returns the first truthy state from the object.
 * @param {Object} obj - An object representing different states.
 * @returns {string} - The key of the first truthy state in the object.
 */
function checkTrue(obj) {
    return Object.entries(obj).filter(state => state[1])[0][0];
}

/**
* Handles window resize event and returns whether the window width is 1024 or more.
* @returns {boolean} - True if window width is 1024 or more, otherwise false.
*/
function handleWindowResize() {
    var windowWidth = window.innerWidth;
    if (windowWidth >= 1024) {
        return true;
    }
}

window.addEventListener("resize", handleWindowResize);

let displayed = false;
function showSubmenuMobile() {
    let submenuMobile = document.getElementById("submenuMobile");
    console.log(submenuMobile);
    if (displayed) {
        submenuMobile.style.right = "-200px";
    } else {
        submenuMobile.style.right = "24px";
    }
    setTimeout(function () {
        document.addEventListener('click', closeOnOutsideClick);
    }, 0);

    displayed = !displayed;
}

/**
 * Is pushing the element out of sight by outsideClick
 * @param {*} event 
 */
function closeOnOutsideClick(event) {
    let submenuMobile = document.getElementById("submenuMobile");

    if (!submenuMobile.contains(event.target) && event.target !== submenuMobile) {
        submenuMobile.style.right = "-200px";
        displayed = false;

        document.removeEventListener('click', closeOnOutsideClick);
    }
}

/**
* Navigates to the page associated with the given buttonName.
* @param {string} buttonName - The name of the button, representing a specific page.
*/
function navigateToPage(buttonName) {
    switch (buttonName) {
        case 'summary':
            window.location.href = '../summary/summary.html';
            break;
        case 'add':
            window.location.href = '../add_task/add_task.html';
            break;
        case 'board':
            window.location.href = '../board/board.html';
            break;
        case 'contacts':
            window.location.href = '../contacts/contact_list.html';
            break;
        case 'help':
            window.location.href = '../templates/help.html';
            break;
        case 'legal':
            window.location.href = '../templates/imprint.html';
            break;
        case 'policy':
            window.location.href = '../templates/privacy_policy.html';
            break;
        case 'login':
            window.location = '../index.html';
            break;
        default:
            break;
    }
}

/**
* Toggles the button states, updates their styles, and navigates to the associated pages.
* @param {string} buttonName - The name of the button.
*/
function toggleButton(buttonName) {
    let buttonStates = {
        summary: false,
        add: false,
        contacts: false,
        board: false
    };
    //let btnFooterMenuDesktopVersion = buttonName
    if (!handleWindowResize()) {

        let newBtnState = Object.entries(buttonStates)
        for (let btn of newBtnState) {
            if (btn[0] !== buttonName) {
                let img = document.getElementById(`img${btn[0].charAt(0).toUpperCase() + btn[0].slice(1)}FooterMenu`);
                img.src = `../assets/img/${btn[0]}_button_default.png`;
                buttonStates[btn[0]] = false;
            }
        }

        let imgFooterMenu = document.getElementById(`img${buttonName.charAt(0).toUpperCase() + buttonName.slice(1)}FooterMenu`);

        if (!buttonStates[buttonName]) {
            imgFooterMenu.src = `../assets/img/${buttonName}_button_clicked.png`;
            navigateToPage(buttonName);
        } else {
            imgFooterMenu.src = `../assets/img/${buttonName}_button_default.png`;
        }
    } else {
        if (!buttonStates[buttonName]) {
            navigateToPage(buttonName);
        }
    }
    buttonStates[buttonName] = !buttonStates[buttonName];
    localStorage.setItem("allBtnState", JSON.stringify(buttonStates));
}

/**
 * Checks footer btns state & display apropriate icon (clicked or default).
 * Used in include-html.js
 * @param {*} buttonName 
 */
function updateBtnStyle(buttonName) {
    if (!handleWindowResize()) {
        switch (buttonName) {
            case 'summary':
                document.getElementById("imgSummaryFooterMenu").src = `../assets/img/${buttonName}_button_clicked.png`;
                break;
            case 'add':
                document.getElementById("imgAddFooterMenu").src = `../assets/img/${buttonName}_button_clicked.png`;
                break;
            case 'board':
                document.getElementById("imgBoardFooterMenu").src = `../assets/img/${buttonName}_button_clicked.png`;
                break;
            case 'contacts':
                document.getElementById("imgContactsFooterMenu").src = `../assets/img/${buttonName}_button_clicked.png`;
                break;
            default:
                break;
        }
    } else {
        switch (buttonName) {
            case 'summary':
                document.getElementById(`btn_${buttonName}_FooterMenuDesktopVersion`).classList.add("btnActiveFooterMenuDesktopVersion");
                break;
            default:
                break;
        }
    }
}