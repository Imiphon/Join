
document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname;
    if (currentPage.includes("summary")) {
        displayAddedTasksArr();

        if (window.innerWidth < 1024) {
            checkStrValueQueryParam();
            showWelcomeMobile();
        }
        displayWelcomeMsg();
    }
});

/**
 * Shows welcome message after login
 */
function showWelcomeMobile() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    if (myParam) {
        let welcomeMsgDiv = document.getElementById('welcomeMsgDiv');
        let summaryWrapper = document.getElementById('summaryWrapper');
        welcomeMsgDiv.classList.remove('welcomeMsgDiv2');
        setTimeout(() => {
            welcomeMsgDiv.classList.add('welcomeMsgDiv1');
            welcomeMsgDiv.classList.add('welcomeMsgDiv2');
            summaryWrapper.classList.add('summaryWrapper1');
            summaryWrapper.classList.add('summaryWrapper2');
        }
            , 1000);
        setTimeout(() => {
            welcomeMsgDiv.classList.remove('welcomeMsgDiv1');
            summaryWrapper.classList.remove('summaryWrapper1');
        }
            , 2000);
    } else {
        summaryWrapper.classList.add('summaryWrapper2');
    }
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

function countUrgentTasks(tasks) {
    if (tasks) {
        return tasks.filter(task => task.priority === 'urgent').length;
    } else {
        return 'no urgents';
    }
}

function countUrgentTasksInAllCategories() {
    return countUrgentTasks(addedTasks[0].inProgress) +
        countUrgentTasks(addedTasks[0].awaitFeedback) +
        countUrgentTasks(addedTasks[0].toDo);
}


function updateDisplay(urgentCount, nextDeadline) {
    document.getElementById('tasksUrgent').innerHTML = urgentCount;
    document.getElementById('taskInBoardDiv').innerHTML = countAllTasks();
    document.getElementById('taskInProgressDiv').innerHTML = addedTasks[0].inProgress.length;
    document.getElementById('taskAwaitingFeedback').innerHTML = addedTasks[0].awaitFeedback.length;
    document.getElementById('taskTodo').innerHTML = addedTasks[0].toDo.length;
    document.getElementById('taskDone').innerHTML = addedTasks[0].done.length;
    document.getElementById('deadline').innerHTML = nextDeadline;
}

function countAllTasks() {
    return addedTasks[0].inProgress.length +
        addedTasks[0].awaitFeedback.length +
        addedTasks[0].toDo.length +
        addedTasks[0].done.length;
}

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

/**
* Displays a welcome message on the screen based on the current hour of the day.
*/
async function displayWelcomeMsg() {
        const date = new Date();
        const currentHour = date.getHours();
        let welcomeMessage;
    
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
        document.getElementById("welcomeText").innerHTML = welcomeMessage + `,&nbsp`;
        document.getElementById("welcomeTextUserName").innerHTML = await checkStrValueQueryParam(); 
        firstHello = true;    
}

/**
* Retrieves user name by user id from URL query parameters and returns it.
* @returns {Promise<string>} - The name of the user or 'dear guest' if user id is not found.
*/
async function checkStrValueQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    if (myParam) {
        try {
            return await findUserId(myParam);
        } catch (e) {
            return 'dear Guest';
        }
    } else {
        let userName = localStorage.getItem('myName');
        return userName;
    }
}

async function findUserId(userId) {
    await loadUsers();
    let userName = users[userId]['name'];
    setNameToLocaleStorage(userName)
    return userName
}

/**
* Loads users from remoteStorage
*/
async function loadUsers() {
    try {
        users = JSON.parse(await getItem("users"));

    } catch (e) {
        console.error("Loading error:", e);
    }
}

function setNameToLocaleStorage(userName) {
    localStorage.setItem('myName', userName);
}