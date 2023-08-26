async function includeHTML() {
    let includeElements = document.querySelectorAll('[include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


// ********************************************************************************
// ************************************* Slidemenu ********************************
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
// ********* This logic changes footer menu icons when clicked ********************
// ********************************************************************************
let summaryBtnNotClicked = false;
let addTaskBtnNotClicked = true;
let contactsBtnNotClicked = true;
let boardBtnNotClicked = true;


function showSummary() {
    let imgSummaryFooterMenu = document.getElementById("imgSummaryFooterMenu");
    if (summaryBtnNotClicked) {
        imgSummaryFooterMenu.src = "../assets/img/summary_button_footer_mobile.png";
    } else {
        imgSummaryFooterMenu.src = "../assets/img/summary_icon_default_mobile.png";
    }
    summaryBtnNotClicked = !summaryBtnNotClicked;
}

function showAddTask() {
    let imgAddTaskFooterMenu = document.getElementById("imgAddTaskFooterMenu");
    if (addTaskBtnNotClicked) {
        imgAddTaskFooterMenu.src = "../assets/img/add-task_clicked_btn_footer_mobile.png";
    } else {
        imgAddTaskFooterMenu.src = "../assets/img/add_task_default_btn_footer_mobile.png";
    }
    addTaskBtnNotClicked = !addTaskBtnNotClicked;  
}

function showContacts() {
    let imgContactsFooterMenu = document.getElementById("imgContactsFooterMenu");
    if (contactsBtnNotClicked) {
        imgContactsFooterMenu.src = "../assets/img/contacts_clicked_btn_footer_mobile.png";
    } else {
        imgContactsFooterMenu.src = "../assets/img/contacts_button_footer_mobile.png";
    }
    contactsBtnNotClicked = !contactsBtnNotClicked;
}


function showBoard() {
    let imgBoardFooterMenu = document.getElementById("imgBoardFooterMenu");
    if (boardBtnNotClicked) {
        imgBoardFooterMenu.src = "../assets/img/board_clicked_btn_footer_mobile.png";
    } else {
        imgBoardFooterMenu.src = "../assets/img/board_button_footer_mobile.png";
    }
    boardBtnNotClicked = !boardBtnNotClicked;
}
// ********************************************************************************
// ********************************************************************************
// ********************************************************************************