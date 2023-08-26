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
    setDefaultContentToSummary();
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
// This logic changes footerMenu icons when clicked & sets summary as default content
// ********************************************************************************
let buttonStates = {
    summary: false,
    add: false,
    contacts: false,
    board: false
};

function toggleButton(buttonName) {
    for (let btn in buttonStates) {
        if (btn !== buttonName) {
            let img = document.getElementById(`img${btn.charAt(0).toUpperCase() + btn.slice(1)}FooterMenu`);
            img.src = `../assets/img/${btn}_button_default.png`;
            buttonStates[btn] = false;
        }
    }

    let imgFooterMenu = document.getElementById(`img${buttonName.charAt(0).toUpperCase() + buttonName.slice(1)}FooterMenu`);
    
    if (!buttonStates[buttonName]) {
        imgFooterMenu.src = `../assets/img/${buttonName}_button_clicked.png`;
    } else {
        imgFooterMenu.src = `../assets/img/${buttonName}_button_default.png`;
    }
    
    buttonStates[buttonName] = !buttonStates[buttonName];
}

function setDefaultContentToSummary() {
    toggleButton('summary');
}
// ********************************************************************************
// ********************************************************************************
// ********************************************************************************