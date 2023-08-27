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
        loadHTMLContent(buttonName);
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




// ********************************************************************************
// **************** fetches the clicked html file *********************************
// ********************************************************************************
async function loadHTMLContent(buttonName) {
    let contentDiv = document.getElementById("mainTagSummaryHtml");
    console.log(buttonName);
    console.log(contentDiv);

    try {
        let filePath = "";
        switch (buttonName) {
            case "contacts":
                filePath = `../contacts/${buttonName.slice(0, -1)}_list.html`;
                break;
            case "summary":
                filePath = `../summary/${buttonName}.html`; 
                break;
            case "add":
                filePath = `../add_task/${buttonName}_task.html`;
                break;
            case "board":
                filePath = `../board/${buttonName}.html`;
                break;    
            default:
                filePath = `../templates/${buttonName}.html`;
                break;
        }
        console.log(filePath);
        const response = await fetch(filePath);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to fetch HTML (${response.status} ${response.statusText})`);
        }

        const data = await response.text();
        console.log(data);
        contentDiv.innerHTML = data;
    } catch (error) {
        console.error("Error loading HTML:", error);
    }
}
// ********************************************************************************
// ********************************************************************************
// ********************************************************************************

