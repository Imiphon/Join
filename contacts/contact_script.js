//============================================================
// Start Contacts
//============================================================

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname;
    if (currentPage.includes('contact_list')) {
        showContacts();
    }
});

function showContacts() {
    let content = document.querySelector('main');
    content.innerHTML = '';
    content.innerHTML += showMainFrame();
    createInitalGroup();
    createInitials();
    showNameGroup();
}

//============================================================
// SHOW INFORMATIONS IN MOBILE
//============================================================

function deleteContact(index) {
    contactArray.splice(index, 1);
    showContacts();
}


//============================================================
// CHECK WIDTH TO CONTROL MOB OR DESK OPTIC
//============================================================

function widthForInfo(index) {
    const width = window.innerWidth;
    if (width <= 1024) {
        showInfoMobile(index);
    } else {
        console.log('more width than 1025px')
        showInfoDesk(index);
    }
}
function showInfoDesk(index) {
    let person = contactArray[index];
    let popupBox = document.getElementById('popupBox');
    popupBox.innerHTML = showInfoText(person, index);
}

function showInfoMobile(index) {
    let main = document.querySelector('main');
    main.innerHTML = '';
    let person = contactArray[index];
    main.innerHTML += showInfoText(person, index);
    document.getElementById('moreRow').style.display = 'none';
}

async function widthForAdd() {
    const width = window.innerWidth;
    if (width <= 1024) {
        await mobilePopup();
        let content = document.getElementById('popContent');
        content.innerHTML = showAddContact();
    } else {
        await deskAddPopup();
        let content = document.getElementById('popupRight');
        content.innerHTML = showAddContact();
        document.getElementById('popTop').style.borderTopRightRadius = '0px';
    }
}

//============================================================
// START TOGGLE DRAWER WITH MORE BTN
//============================================================

function toggleDrawer() {
    let drawer = document.getElementById('drawer');
    if (drawer.classList.toggle('open')) {
        document.addEventListener('click', closeOnClick);
    } else {
        document.removeEventListener('click', closeOnClick);
    }
}

function closeOnClick(event) {
    let drawer = document.getElementById('drawer');
    let moreBtn = document.querySelector('.more-btn');
    if (drawer && moreBtn) {
        if (!drawer.contains(event.target) && !moreBtn.contains(event.target)) {
            closeDrawer();
            document.removeEventListener('click', closeOnClick);
        }
    }
    else {
        // if drawer or moreBtn doesn't exists
        document.removeEventListener('click', closeOnClick);
    }
}

function closeDrawer() {
    document.getElementById('drawer').classList.remove('open');
}

//============================================================
//EDIT CONTACT 
//============================================================
async function editMobContact(index) {
    let indexNr = index; //Nr of contactArray
    await mobilePopup();
    let content = document.getElementById('popContent');
    content.innerHTML = showEditContact(indexNr);
}

async function editDeskContact(index) {
    let indexNr = index; //Nr of contactArray
    await deskEditPopup();
    document.getElementById('popupLeft').innerHTML = showEditContact(indexNr);
    document.getElementById('popTop').style.borderTopLeftRadius = '0px';
}

function changeEdits() {
    let fullNameInput = document.getElementById('fullName');
    let emailInput = document.getElementById('email');
    let phoneInput = document.getElementById('phone');

    let fullNameValue = fullNameInput.value ? fullNameInput.value : fullNameInput.placeholder;
    let emailValue = emailInput.value ? emailInput.value : emailInput.placeholder;
    let phoneValue = phoneInput.value ? phoneInput.value : phoneInput.placeholder;

    fullNameInput.value = fullNameValue;
    emailInput.value = emailValue;
    phoneInput.value = phoneValue;
}

function editContactInArray(index) {
    changeEdits();
    if (!validateForm()) {
        showEditContact(index);
        return;
    }
    let name = document.getElementById('fullName').value.split(' ');
    let mail = document.getElementById('email').value;
    let phone = parseInt(document.getElementById('phone').value);
    let preName = upperCase(name[0]);
    let lastName = upperCase(name[1]);

    contactArray[index].name = preName;
    contactArray[index].lastName = lastName;
    contactArray[index].mail = mail;
    contactArray[index].phone = phone;

    document.getElementById('userForm').reset();
    closePopup();
    showContacts();
}

function deleteInEditor(index) {
    contactArray.splice(index, 1);
    closePopup()
    showContacts();
}
//============================================================
// CREATE NEW CONTACT IN MOBILE 
//============================================================

function openColorPicker() {
    let colorBox = document.getElementById('colorBox');
    let colorPicker = document.getElementById('colorPicker');

    if (colorPicker.style.display === 'none') {
        colorPicker.style.display = 'flex';
    } else {
        colorPicker.style.display = 'none';
    }
    updateColors();
}

function updateColors() {
    let colorPicker = document.getElementById('colorPicker');
    colorPicker.innerHTML = colorsInPicker();
}

function colorsInPicker() {
    let pickerHtml = '';
    for (let color in userColors) {
        pickerHtml += `
        <div class="color-option" style="background-color: ${userColors[color]};" onclick="setColor('${color}', event)"></div>
        `;
    }
    return pickerHtml;
}

function setColor(color, event) {
    document.getElementById('colorBox').style.backgroundColor = userColors[color];
    let colorPicker = document.getElementById('colorPicker');
    colorPicker.style.display = 'none';
    event.stopPropagation();
}

function closeColorPicker() {

}

function createContact() {
    if (!validateForm()) {
        return;
    }
    let name = document.getElementById('fullName').value;
    let mail = document.getElementById('email').value;
    let phone = parseInt(document.getElementById('phone').value);
    let color = document.getElementById('colorBox').style.backgroundColor;

    let { preName, lastName } = splitName(name);

    contactArray.push({
        name: preName,
        lastName: lastName,
        mail: mail,
        phone: phone,
        color: color,
    });
    document.getElementById('userForm').reset();

    closePopup();
    
    showContacts();
    successInfo();
}

function successInfo() {
    const infoDiv = document.getElementById("success-info");
    // Set initial position to bottom
    infoDiv.style.bottom = "0";
    infoDiv.style.opacity = "1";
    infoDiv.style.visibility = "visible";

    // Animate to middle of the screen
    setTimeout(() => {
      infoDiv.style.bottom = "50%";
    }, 0);

    // Stay in the middle for 2 seconds
    setTimeout(() => {
      infoDiv.style.bottom = "0";
    }, 2000);

    // Hide after animation completes
    setTimeout(() => {
      infoDiv.style.opacity = "0";
      infoDiv.style.visibility = "hidden";
    }, 2500);
  }

function splitName(name) {
    let nameParts = name.split(' ');
    let preName = upperCaseFirstLetter(nameParts[0]);
    let lastName = upperCaseFirstLetter(nameParts[1]);
    return { preName, lastName };
}

function upperCaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function upperCase(name) {
    let inputName = name;
    let formattedName = inputName.charAt(0).toUpperCase() + inputName.slice(1);
    return formattedName;
}

//=============================================
// FUNCTIONS TO CREATE INITIALS (IN CIRCLE)
//=============================================

//they will pushed in contactArrays
function createInitials() {
    for (let i = 0; i < contactArray.length; i++) {
        let person = contactArray[i];
        let initials = person.name[0] + person.lastName[0];
        contactArray[i].initials = initials;
    }
}

// initialGroups are in templates/global_arrays.js
function createInitalGroup() {
    initialGroups = contactArray.reduce((acc, current) => {
        let initial = current.name[0].toUpperCase();
        // if key not exist as a letter in the accumulator, push it
        if (!acc[initial]) {
            acc[initial] = [];
        }
        // push current name to acc
        acc[initial].push(current);
        return acc;
    }, {});
}

//=============================================
//CHECK VALIDATION
//=============================================

function validateForm() {
    let namePattern = /^[a-zA-Z]+\s[a-zA-Z]+$/; // accept two words
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // email check
    let phonePattern = /^\+?\d{2,4}[-.\s]?\d{1,15}$/;

    let nameInput = document.getElementById('fullName').value;
    let emailInput = document.getElementById('email').value;
    let phoneInput = document.getElementById('phone').value;

    let name = nameInput.split(' ');

    if (name.length !== 2) {
        alert('Bitte geben Sie Vor- und Nachnamen getrennt durch ein Leerzeichen ein.');
        return false;
    }

    else if (!namePattern.test(nameInput)) {
        alert('Bitte geben Sie einen gültigen Name und Nachname ein.');
        return false;
    }

    else if (!emailPattern.test(emailInput)) {
        alert('Bitte geben Sie eine gültige Emailadresse ein.');
        return false;
    }

    else if (!phonePattern.test(phoneInput)) {
        alert('Bitte geben Sie eine gültige Telefonnummer ein.');
        return false;
    }
    // if all right:
    return true;
}

//============================================================
//  POPUP FUNCTIONS
//============================================================

function mobilePopup() {
    return new Promise((resolve) => {
        let popupHTML = popupBack();
        document.body.innerHTML += popupHTML;
        let popupBg = document.getElementById('popupBackground');
        popupBg.style.display = 'block';
        setTimeout(() => {
            resolve();
        }, 0);
    });
}

function deskEditPopup() {
    return new Promise((resolve) => {
        /*get popupackground */
        let popupHTML = popupBack();
        /*put Background in popupBox in mainFrame */
        document.getElementById('popupBox').innerHTML += popupHTML;
        let popupBg = document.getElementById('popupBackground');
        popupBg.style.display = 'block';
        setTimeout(() => {
            resolve();
        }, 0);
    });
}

function deskAddPopup() {
    return new Promise((resolve) => {
        let popupHTML = popupBack();
        document.getElementById('popupBox').innerHTML += popupHTML;
        let popupBg = document.getElementById('popupBackground');
        popupBg.style.display = 'block';
        setTimeout(() => {
            resolve();
        }, 0);
    });
}

function popupBack() {
    return `
    <div class="popup-background" id="popupBackground">
        <div class="popup" id="popup">  
            <div class="popup-content" id="popContent">
            </div>          
            <div class="pop-add-content" id="popupRight">
            </div>
            <div class="pop-edit-content" id="popupLeft">
            </div>
        </div>
    </div>
    `;
}

function closePopup() {
    let colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.remove();
    }
    document.getElementById("popupBackground").style.display = "none";
}

//============================================================
//  HTML TEMPLATES 
//============================================================

function showMainFrame() {
    return `
    <div class="add-btn-frame">
    </div> 
    <button class="add-btn" id="addBtn" onclick="widthForAdd();">
    <img src="../assets/img/person_add.png" alt="">
    </button> 
    <div class="main-frame" id="mainFrame">
        <div class="name-group" id="nameGroup">    
        </div> 
        <div class="popup-box" id="popupBox"> 
        </div> 
        <div id="success-info">Contact successfully created</div>        
    </div> 
`;
}

function showNameGroup() {
    let content = document.getElementById('nameGroup');
    content.innerHTML = '';
    for (let initial in initialGroups) {
        content.innerHTML += `
                <div class="letter-box">
                    <span class="letterBox">${initial}</span>
                </div>
                <div class="line-box">
                    <div class="line"> </div>
                </div>
            `;
        content.innerHTML += personDatas(initial);
    }
}

function personDatas(initial) {
    let htmlContent = '';
    for (let i = 0; i < contactArray.length; i++) {
        let thisPerson = contactArray[i];
        if (initialGroups[initial].includes(thisPerson)) {
            let person = thisPerson;
            htmlContent += `
                <div class="name-frame">
                    <div class="name-box" onclick="widthForInfo(${i})">
                        <div class="side-circle" class="initials" style="background-color: ${person.color};">
                            ${person.initials}
                        </div>
                        <div class="name-mail-frame">
                            <div class="full-name">
                                ${person.name} ${person.lastName}
                            </div>
                            <div class="mail">
                                ${person.mail}
                            </div>
                        </div>
                    </div>
                </div>
                `;
        }
    }
    return htmlContent;
}

function showInfoText(person, indexNr) {
    return `
        <div class="detail-frame" id="detailFrame">
            <div class="detail-top-head">
                <div>Contact Informations</div>
                <a href="contact_list.html">
                    <img src="../assets/img/arrow-left-line.svg" alt="back">
                </a>
            </div>
            <div class="detail-name-box">
                <div class="detail-ellipse" style="background-color: ${person.color}">
                    ${person.initials}
                </div>
                    <div class="column">    
                        <div class="detail-name">
                        ${person.name} ${person.lastName}
                        </div>
                        <div class="more-row" id="moreRow">
                            <div onclick="editDeskContact(${indexNr})">
                                <img src="../assets/img/edit.png" alt="Edit">
                                <span>Edit</span>
                            </div>
                            <div  onclick="deleteContact(${indexNr})">
                                <img src="../assets/img/delete.png" alt="Delete">
                                <span>Delete</span>
                            </div>
                        </div>
                    </div>    
            </div>
            <div class="adr-box">
                <div class="detail-description bold">
                    Email
                </div>
                <div class="mail">
                ${person.mail}
                </div>
                <div class="detail-description bold">
                    Phone
                </div>
                <div class="info-text">
                ${person.phone}
                </div>
            </div>
        </div>
        <button class="more-btn" id="moreBtn" onclick="toggleDrawer()">
            <img src="../assets/img/more_btn.svg" alt="">
        </button>
        <div id="drawer">
          <div class="drawer-item" onclick="editMobContact(${indexNr})">
            <img src="../assets/img/edit.png" alt="Edit">
            <span>Edit</span>
          </div>
          <div class="drawer-item" onclick="deleteContact(${indexNr})">
            <img src="../assets/img/delete.png" alt="Delete">
            <span>Delete</span>
          </div>
        </div>
    `;
}

function showAddContact() {
    return `
    <div class="pop-top" id="popTop">
    <a onclick="closePopup()"><img src="../assets/img/close.png" alt="close"></a>
    <span class="pop-header">Add contact</span>
    <span class="pop-subtitle">Tasks are better with a team!</span>
</div>

<div>
    <img class="popup-circle no-border" src="../assets/img/person_initial.png" alt="person_initial">
</div>

<div class="pop-bottom">
    <div class="contact-form">
        <form id="userForm">
            <div class="contact-frame">
                <input class="contact-input" type="text" id="fullName" placeholder="Name Nachname">
                <div class="color-img-box">
                    <div class="color-frame">
                        <div id="colorBox" class="color-box" onclick="openColorPicker()">
                            <div id="colorPicker" class="color-picker" style="display: none;">
                                <!-- colors -->
                            </div>
                        </div>
                    </div>
                    <img src="../assets/img/person_small.png" alt="name">
                </div>
            </div>
            <div class="contact-frame">
                <input class="contact-input" type="email" id="email" placeholder="Email" required>
                <img src="../assets/img/mail_small.png" alt="name">
            </div>
            <div class="contact-frame tel-box">
                <input class="contact-input" type="tel" id="phone" name="phone" placeholder="Phone"
                    pattern="\+?\d{2,4}[-.\s]?\d{1,15}" required>
                <img src="../assets/img/call_small.png" alt="name">
                <!-- ------------ number with country-code:                 
            <select id="country-code" name="country_code">
            <option value="+1">USA (+1)</option>
            <option value="+49">Germany (+49)</option>
            </select>
            <input class="contact-input" type="tel" id="phone" pattern="\d{1,15}" placeholder="Phone" required> 
            ------------------------------------------------ -->
            </div>
        </form>
    </div>
    <div>
        <button class="blue-btn" onclick="createContact()">
            Create Contact
            <img src="../assets/img/check_small.png" alt="name">
        </button>
    </div>
</div>
        `;
}

function showEditContact(index) {
    
    let person = contactArray[index];
    let indexNr = index;
    return `
        <div class="pop-top" id="popTop">                
            <a onclick="closePopup()"><img src="../assets/img/close.png" alt="close"></a>
            <span class="pop-header">Edit contact</span> 
            <span class="pop-subtitle">Tasks are better with a team!</span>        
        </div>
        <div>
            <div class="popup-circle detail-ellipse" style="background-color: ${person.color}"> 
            ${person.initials}
            </div>
        </div>
        
        <!-- <div> <img class="popup-circle" src="../assets/img/person_initial.png" alt="../assets/img/person_initial.png"> </div>   -->     
        <div class="pop-bottom">
        <div class="contact-form">
            <form id="userForm">
                <div class="contact-frame">
                    <input class="contact-input" required type="text" id="fullName" placeholder="${person.name + ' ' + person.lastName}">
                    <img src="../assets/img/person_small.png" alt="name">
                </div>    
                <div class="contact-frame">
                    <input class="contact-input" required type="email" id="email" placeholder="${person.mail}">
                    <img src="../assets/img/mail_small.png" alt="name">
                </div>    
                <div class="contact-frame">
                    <input class="contact-input" required type="tel" id="phone" placeholder="${person.phone}">
                    <img src="../assets/img/call_small.png" alt="name">
                </div>
            </form> 
        </div>
    
        <div class="btn-box">
            <button class="white-btn" onclick="deleteInEditor(${indexNr})">
                Delete
            </button>
            <button class="blue-btn" onclick="editContactInArray(${indexNr})">
                Save
                <img src="../assets/img/check_small.png" alt="name">
            </button>
        </div>
                `;
    return content;
}

