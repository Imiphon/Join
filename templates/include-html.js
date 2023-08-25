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
// ******************* Change footer Icon when clicked ****************************
// ********************************************************************************
let summaryIconClicked = false;
let addTaskIconClicked = false;


function showSummary() {
    let imgSummaryFooterMenu = document.getElementById("imgSummaryFooterMenu");
    if (summaryIconClicked) {
        imgSummaryFooterMenu.src = "../assets/img/summary_button_footer_mobile.png";
    } else {
        imgSummaryFooterMenu.src = "../assets/img/summary_icon_default_mobile.png";
    }
    summaryIconClicked = !summaryIconClicked;
}

function showAddTask() {
    let imgAddTaskFooterMenu = document.getElementById("imgAddTaskFooterMenu");
    if (addTaskIconClicked) {
        imgAddTaskFooterMenu.src = "../assets/img/add-task_clicked_btn_footer_mobile.png";
    } else {
        imgAddTaskFooterMenu.src = "../assets/img/add_task_default_btn_footer_mobile.png";
    }
    addTaskIconClicked = !addTaskIconClicked;  
}
// ********************************************************************************
// ********************************************************************************
// ********************************************************************************