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