let createBtn = document.getElementById('createBtn');

/**
 * eventListener instead of onload-function to check if its the right side 
 * cause:
 * It separates the JavaScript logic from the HTML, making the code cleaner and more maintainable.
 * The same JavaScript code can (actually) be used for multiple HTML pages without having to modify the HTML code.
 */
document.addEventListener("DOMContentLoaded", function () {
  let currentPage = window.location.pathname;
  if (currentPage.includes("contact_list")) {
    getContactsFromServer();
  }
});

/**
 * load contacts from server
 */
async function getContactsFromServer() {
  try {
    contactArray = JSON.parse(await getItem('contacts'));
  } catch (e) {
    console.info('could not find contacts')
  }
  showContacts();
}

/**
 * this starts a frame in the main area with #nameGroup, #popup and successInfo divs
 * calling functions to build initial groups, inner content and show all names
 */
function showContacts() {
  let content = document.querySelector("main");
  content.innerHTML = "";
  content.innerHTML += showMainFrame();
  createInitalGroup();
  //createInitials();
  showNameGroup();
}

/**
 * put all names in right initialGroup
 */
function showNameGroup() {
  let content = document.getElementById("nameGroup");
  content.innerHTML = "";
  for (let initial in initialGroups) {
    content.innerHTML += GroupName(initial);
    content.innerHTML += personDatas(initial);
  }
}

/**
 * takes index from personDatas(), over widthForInfo(), 
 * showInfoDesk() / showInfoMobile() and delete the contact 
 * @param {number} index 
 */
function deleteContact(index) {
  contactArray.splice(index, 1);
  setItem('contacts', JSON.stringify(contactArray));
  showContacts();
}

//============================================================
// CHECK WIDTH TO CONTROL MOB OR DESK OPTIC
//============================================================

/**
 * takes index from personDatas()
 * open mob or desk optic
 * @param {number} index 
 */
function widthForInfo(index) {
  const width = window.innerWidth;
  if (width <= 1024) {
    showInfoMobile(index);
  } else {
    showInfoDesk(index);
    showNameGroup();
  }
}

/**
 * takes index from personDatas()
 * open mob or desk optic
 * @param {number} index 
 */
function widthForEdit(index) {
  const width = window.innerWidth;
  if (width <= 1024) {
    openEditMobile(index);
  } else {
    openEditDesk(index);
  }
}

/**
 * takes index from personDatas()
 * open mob or desk optic
 * @param {number} index 
 */
async function widthForAdd() {
  const width = window.innerWidth;
  if (width <= 1024) {
    await mobilePopup();
    let content = document.getElementById("popContent");
    content.innerHTML = showAddContact();
  } else {
    await deskAddPopup();
    let content = document.getElementById("popupRight");
    content.innerHTML = showAddContact();
    document.getElementById("popTop").style.borderTopRightRadius = "0px";
  }
}

//============================================================
// INFO AREA
//============================================================

function showInfoDesk(index) {
  let person = contactArray[index];
  let popupBox = document.getElementById("popupBox");
  popupBox.innerHTML = showInfoText(person, index);
}
function showInfoMobile(index) {
  let main = document.querySelector("main");
  main.innerHTML = "";
  let person = contactArray[index];
  main.innerHTML += showInfoText(person, index);
  document.getElementById("moreRow").style.display = "none";
}

//============================================================
// TOGGLE DRAWER WITH MORE BTN IN INFO AREA
//============================================================

function toggleDrawer() {
  let drawer = document.getElementById("drawer");
  if (drawer.classList.toggle("open")) {
    document.addEventListener("click", closeOnClick);
  } else {
    document.removeEventListener("click", closeOnClick);
  }
}

function closeOnClick(event) {
  let drawer = document.getElementById("drawer");
  let moreBtn = document.querySelector(".more-btn");
  if (drawer && moreBtn) {
    if (!drawer.contains(event.target) && !moreBtn.contains(event.target)) {
      closeDrawer();
      document.removeEventListener("click", closeOnClick);
    }
  } else {
    // if drawer or moreBtn doesn't exists
    document.removeEventListener("click", closeOnClick);
  }
}

function closeDrawer() {
  document.getElementById("drawer").classList.remove("open");
}

//============================================================
//EDIT CONTACT
//============================================================

async function openEditMobile(index) {
  let indexNr = index; //Nr of contactArray
  await mobilePopup();
  let content = document.getElementById("popContent");
  content.innerHTML = showEditContact(indexNr);
  checkOldValues();
}

async function openEditDesk(index) {
  let indexNr = index; //Nr of contactArray
  await deskEditPopup();
  document.getElementById("popupLeft").innerHTML = showEditContact(indexNr);
  document.getElementById("popTop").style.borderTopLeftRadius = "0px";
  checkOldValues();
}

function checkOldValues() {
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  if (!fullNameInput.value) {
    fullNameInput.value = fullNameInput.placeholder;
  }
  if (!emailInput.value) {
    emailInput.value = emailInput.placeholder;
  }
  if (!phoneInput.value) {
    phoneInput.value = phoneInput.placeholder;
  }
}

function editContactInArray(index) {
  let name = document.getElementById("fullName").value; //.split(' ') in splitName()
  let mail = document.getElementById("email").value;
  let phone = parseInt(document.getElementById("phone").value);
  let color = document.getElementById("colorBox").style.backgroundColor;
  let { preName, lastName } = splitName(name);
  let initials = preName[0] + lastName[0];

  contactArray[index].name = preName;
  contactArray[index].lastName = lastName;
  contactArray[index].mail = mail;
  contactArray[index].phone = phone;
  contactArray[index].initials = initials;
  contactArray[index].color = color;

  completeEdition(index);
}

function completeEdition(index) {
  document.getElementById("userForm").reset();
  closePopup();
  setItem('contacts', JSON.stringify(contactArray));
  widthForInfo(index);
}

/**
 * takes index from personDatas(), over widthForInfo(), 
 * showEditContact() and delete the contact 
 * @param {number} index 
 */
function deleteInEditor(index) {
  contactArray.splice(index, 1);
  closePopup();
  setItem('contacts', JSON.stringify(contactArray));
  showContacts();
}

//============================================================
// CREATE NEW CONTACT 
//============================================================


function openColorPicker() {
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
  let pickerBox = '';
  for (let color in userColors) {
    pickerBox += `
        <div class="color-option" 
        style="background-color: ${userColors[color]};" 
        onclick="setColor('${color}', event)"></div>
        `;
  }
  return pickerBox;
}

function setColor(color, event) {
  document.getElementById("colorBox").style.backgroundColor = userColors[color];

  let colorPicker = document.getElementById("colorPicker");
  colorPicker.style.display = "none";
  event.stopPropagation();
  if (document.querySelector(".editor")) {
    //without space between the 2 classes to select exactly this element
    //'.popup-circle .detail-ellipse' would select the 2nd one as a child of the 1st
    let detailEllipse = document.querySelector(".popup-circle.detail-ellipse");
    detailEllipse.style.backgroundColor = userColors[color];
  }
}

function createContact() {
  createBtn.disabled = true;
  let fullName = document.getElementById("fullName").value;
  let mail = document.getElementById("email").value;
  let phone = parseInt(document.getElementById("phone").value);
  let color = document.getElementById("colorBox").style.backgroundColor;
  let { preName, lastName } = splitName(fullName);
  let initials = person.name[0] + person.lastName[0];

  contactArray.push({
    name: preName,
    lastName: lastName,
    mail: mail,
    phone: phone,
    initials: initials,
    color: color,
  });

  completeCreation();
}

function completeCreation() {
  createBtn.disabled = false;
  document.getElementById("userForm").reset();
  closePopup();
  setItem('contacts', JSON.stringify(contactArray));
  let index = contactArray.length - 1;
  widthForInfo(index);
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

function splitName(fullName) {
  let nameParts = fullName.split(" ");
  let preName = upperCaseFirstLetter(nameParts[0]);
  let lastName = upperCaseFirstLetter(nameParts[1]);
  return { preName, lastName };
}

function upperCaseFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//=============================================
// FUNCTIONS TO CREATE INITIALS (IN CIRCLE)
//=============================================

/**
 * Creates initialGroups from contactArray in templates/global_arrays.js 
 * and gives it back to showContacts()
 * if key is not exist as a letter in the accumulator,it push a new one
 * push current name to acc
 */
function createInitalGroup() {
  initialGroups = contactArray.reduce((acc, current) => {
    let initial = current.name[0].toUpperCase();   
    if (!acc[initial]) {
      acc[initial] = [];
    }
    acc[initial].push(current);
    return acc;
  }, {});
}

//============================================================
//  POPUP FUNCTIONS
//============================================================

/**
 * Displays a mobile popup by appending it to the body and making it visible.
 * Resolves the promise immediately after displaying the popup. 
 * @returns {Promise<void>} A promise that resolves once the popup is displayed.
 */
function mobilePopup() {
  return new Promise((resolve) => {
    let popupHTML = popupBack();
    document.body.innerHTML += popupHTML;
    let popupBg = document.getElementById("popupBackground");
    popupBg.style.display = "block";
    setTimeout(() => {
      resolve();
    }, 0);
  });
}

function deskEditPopup() {
  return new Promise((resolve) => {
    //get popupBackground
    let popupHTML = popupBack();
    //set Background in popupBox in mainFrame
    document.getElementById("popupBox").innerHTML += popupHTML;
    let popupBg = document.getElementById("popupBackground");
    popupBg.style.display = "block";
    setTimeout(() => {
      resolve();
    }, 0);
  });
}

function deskAddPopup() {
  return new Promise((resolve) => {
    let popupHTML = popupBack();
    document.getElementById("popupBox").innerHTML += popupHTML;
    let popupBg = document.getElementById("popupBackground");
    popupBg.style.display = "block";
    setTimeout(() => {
      resolve();
    }, 0);
  });
}

function closePopup() {
  let colorPicker = document.getElementById("colorPicker");
  let popBg = document.getElementById("popupBackground");
  if (colorPicker) {
    colorPicker.remove();
  }
  popBg.remove();
  //document.getElementById("popupBackground").style.display = "none";
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

function GroupName(initial) {
  return `
    <div class="letter-box">
        <span class="letterBox">${initial}</span>
    </div>
    <div class="line-box">
        <div class="line"> </div>
    </div>
`;
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
                            <div class="more-row-box" onclick="widthForEdit(${indexNr})">
                                <img src="../assets/img/edit.png" alt="Edit">
                                <span>Edit</span>
                            </div>
                            <div class="more-row-box" onclick="deleteContact(${indexNr})">
                                <img src="../assets/img/delete.png" alt="Delete">
                                <span>Delete</span>
                            </div>
                        </div>
                    </div>    
            </div>
            <div class="adr-box">
            <div class="desk-header">Contact Informations</div>
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
          <div class="drawer-item" onclick="widthForEdit(${indexNr})">
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

function showAddContact() {
  return `
    <div class="pop-top" id="popTop">
        <a onclick="closePopup()"><img src="../assets/img/close.png" alt="close"></a>
        <img class="pop-logo" src="../assets/img/logo_mobile_white.svg">
        <span class="pop-header">Add contact</span>
        <span class="pop-subtitle">Tasks are better with a team!</span>
    </div>
    <div>
        <img class="popup-circle no-border detail-ellipse" src="../assets/img/person_initial.png" alt="person_initial">
    </div>
    <div class="pop-bottom">
        <div class="form-frame">
            <form id="userForm" class="user-form" onsubmit="createContact(); return false;">
                <div class="contact-frame">
                <input 
                class="contact-input" 
                type="text" 
                id="fullName" 
                placeholder="Name Nachname" 
                required 
                pattern="^[a-zA-Z]+ [a-zA-Z]+$" 
                title="Bitte geben Sie einen Vor- und Nachnamen ein.">
            
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
                    <input class="contact-input" type="email" required id="email" placeholder="Email">
                    <img src="../assets/img/mail_small.png" alt="name">
                </div>
                <div class="contact-frame tel-box">
                    <input class="contact-input" required type="tel" id="phone" placeholder="Phone"
                    pattern="^\\+?\\d{10,15}$" title="Bitte geben Sie eine gültige Telefonnummer ein.">
                    <img src="../assets/img/call_small.png" alt="phone">
                </div>
                <div class="btn-box">
                <button class="white-btn" onclick="closePopup(); return false;">
                    Cancel
                    <img src="../assets/img/close_dark-grey.png">
                </button>
                <button id="createBtn" type="submit" class="blue-btn">
                    Create Contact
                    <img src="../assets/img/check_small.png">
                </button>
            </div>
            </form>
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
        <img class="pop-logo" src="../assets/img/logo_mobile_white.svg">
        <span class="pop-header">Edit contact</span>
        <span class="pop-subtitle">Tasks are better with a team!</span>
    </div>
    <div>
        <div class="popup-circle detail-ellipse" style="background-color: ${person.color}">
            ${person.initials}
        </div>
    </div>
    <div class="pop-bottom">
    <div class="form-frame">
        <form id="userForm" class="user-form" onsubmit="editContactInArray(${indexNr}); return false;">            
                <div class="contact-frame">
                    <input class="contact-input" type="text" id="fullName"
                        placeholder="${person.name} ${person.lastName}" required pattern="^[a-zA-Z]+ [a-zA-Z]+$"
                        title="Bitte geben Sie einen Vor- und Nachnamen ein.">

                        <div class="color-img-box">
                        <div class="color-frame">
                            <div id="colorBox" class="color-box editor" onclick="openColorPicker()" style="background-color: ${person.color}">
                                <div id="colorPicker" class="color-picker" style="display: none;">
                                    <!-- colors -->
                                </div>
                            </div>
                        </div>
                        <img src="../assets/img/person_small.png" alt="name">
                    </div>
                </div>
                <div class="contact-frame">
                    <input class="contact-input" required type="email" id="email" placeholder="${person.mail}">
                    <img src="../assets/img/mail_small.png" alt="name">
                </div>
                <div class="contact-frame">
                    <input class="contact-input" required type="tel" id="phone" placeholder="${person.phone}"
                        pattern="^\\+?\\d{10,15}$" title="Bitte geben Sie eine gültige Telefonnummer ein.">    
                    <img src="../assets/img/call_small.png" alt="phone">
                </div>
            
            <div class="btn-box">
                <button class="white-btn" onclick="deleteInEditor(${indexNr})">
                    Delete
                </button>
                <button class="blue-btn" type="submit">
                    Save
                    <img src="../assets/img/check_small.png">
                </button>
            </div>
        </form>
        </div>
    </div>
    `;
}
