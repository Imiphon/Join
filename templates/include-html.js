async function includeHTML() {
    let includeElements = document.querySelectorAll('[include-html]');
    // for (let i = 0; i < includeElements.length; i++) {    // **** wollen wir die for of oder for loop haben ? 
    //     const element = includeElements[i];
    for (var element of includeElements) {
        file = element.getAttribute("include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }

    // ***** check footer btns state & display apropriate icon (clicked or default)
    if (localStorage.getItem("allBtnState")) {
        let state = JSON.parse(localStorage.getItem("allBtnState"));
        updateBtnStyle(checkTrue(state));
    }
}

function checkTrue(obj) {
   return Object.entries(obj).filter(state => state[1])[0][0];
}

// ********************************************************************************
// ****************************** header Slidemenu ********************************
// ********************************************************************************
let displayed = false;
function showSubmenuMobile() {
      let submenuMobile = document.getElementById("submenuMobile");
      if (displayed) {
            submenuMobile.style.right = "-200px";
      } else {
            submenuMobile.style.right = "24px";
      }
      displayed = !displayed;
}
// ********************************************************************************
// ********************************************************************************
// ********************************************************************************


// ********************************************************************************
// ********************* navigates to listed pages ********************************
// ********************************************************************************
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
        default:
            break;
    }
}
// ********************************************************************************
// ********************************************************************************
// ********************************************************************************



// ********************************************************************************
// This logic changes footer icon btns when clicked & sets summary as default content
// ********************************************************************************
function toggleButton(buttonName) {
    let buttonStates = {
        summary: false,
        add: false,
        contacts: false,
        board: false
    };
    let newBtnState = Object.entries(buttonStates)
    for (let btn of newBtnState) {
        if (btn[0] !== buttonName) {
            let img = document.getElementById(`img${btn[0].charAt(0).toUpperCase() + btn[0].slice(1)}FooterMenu`);
            console.log(btn[0], btn);
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
    buttonStates[buttonName] = !buttonStates[buttonName];
    localStorage.setItem("allBtnState", JSON.stringify(buttonStates));
}


function updateBtnStyle(buttonName) {
    switch (buttonName) {
        case 'summary':
            document.getElementById("imgSummaryFooterMenu").src =  `../assets/img/${buttonName}_button_clicked.png`;
            break;
        case 'add':
            let add = document.getElementById("imgAddFooterMenu");
            add.src = `../assets/img/${buttonName}_button_clicked.png`;
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
    
}

// ********************************************************************************
// ********************************************************************************
// ********************************************************************************