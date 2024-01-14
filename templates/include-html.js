/**
 * Is getting header and footer 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[include-html]');
    for (var element of includeElements) {
        file = element.getAttribute("include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }

    // checks footer btns state & display apropriate icon (clicked or default)
    if (localStorage.getItem("allBtnState")) {
        let state = JSON.parse(localStorage.getItem("allBtnState"));
        updateBtnStyle(checkTrue(state));
    }
    // shows actual initials in the header
    showNavInits();
}

