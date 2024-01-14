let rememberNameBox;

/**
 * eventListener to check if its the right side instead of onload-function
 * cause:
 * It separates the JavaScript logic from the HTML, making the code cleaner and more maintainable.
 * The same JavaScript code can be used for multiple HTML pages without having to modify the HTML code.
 */
document.addEventListener("DOMContentLoaded", function () {
  let currentPage = window.location.pathname;
  if (currentPage.includes("contact_list")) {
    getContactsFromServer();
  }
});

/**
 * sort last names in contactArray to alphabetic order
 */
async function sortContacts() {

  contactArray.sort((a, b) => {
    let nameA = a.lastName;
    let nameB = b.lastName;

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  await setItem('contacts', JSON.stringify(contactArray));
}

/**
 * shows main structure of contact_list.html
 * calls nameGroup
 */
function showContacts() {
  let content = document.querySelector("main");
  content.innerHTML = "";
  content.innerHTML += showMainFrame();
  createInitalGroup();
  showNameGroup();
}

/**
 * sort all initials in right order
 * put all names in right initialGroup
 */
function showNameGroup() {
  let content = document.getElementById("nameGroup");
  content.innerHTML = "";
  let sortedInitials = Object.keys(initialGroups).sort();

  for (let i = 0; i < sortedInitials.length; i++) {
    let initial = sortedInitials[i];
    content.innerHTML += GroupName(initial);
    content.innerHTML += personDatas(initial);
  }
}

/**
 * Constructs a specific initial group. It iterates over the contactArray and
 * appends the appropriate HTML content for each person with the specified initial.
 *
 * @param {string} initial - The initial letter for filtering the persons in contactArray.
 * @returns {string} The HTML content representing persons of the specified initial group.
 */
function personDatas(initial) {
  let htmlContent = '';
  for (let i = 0; i < contactArray.length; i++) {
    let thisPerson = contactArray[i];
    if (initialGroups[initial].includes(thisPerson)) {
      let person = thisPerson;
      htmlContent += showPersonDatas(person, i);
    }
  }
  return htmlContent;
}

/**
 * takes index from personDatas(), over showInfo() and delete the contact 
 * @param {int} index 
 */
async function deleteContact(index) {
  contactArray.splice(index, 1);
  let userId = localStorage.getItem('userId');
  await setItem('contacts' + userId, JSON.stringify(contactArray));
  closeInfo();
  showContacts();
}

/**
 * takes index from personDatas()
 * open mob or desk optic
 * @param {int} index 
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
 * @param {int} index 
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

/**
 * takes index from person in (global) contactArray
 * get id from (desk-) popup and set content from showInfoText() 
 * @param {int} index 
 */
function showInfo(index) {
  let person = contactArray[index];
  changeBackColor(index);
  person.style = 'background-color: blue';
  let infoBox = document.getElementById("infoBox");
  infoBox.innerHTML = showInfoText(person, index);
  infoBox.style.display = 'inline';
}

let closeMobile = false;
/**
 * Changes the background-color of clicked nameBox
 * and set old background unset - if exist
 * @param {number} index 
 */
function changeBackColor(index) {  
  let lastBox = rememberNameBox;
  if(lastBox) {
    lastBox.style.backgroundColor = 'unset';
  }
  if(!closeMobile){
    let currentNameBox = document.getElementById(index);
    rememberNameBox = currentNameBox;
    currentNameBox.style.backgroundColor = 'var(--toggle-blue)';
  } else {
    closeMobile = false;
  }
}

/**
 * set div #infoBox to none
 */
function closeInfo() {
  closeMobile = true;
  changeBackColor();
  let infoBox = document.getElementById('infoBox')
  infoBox.style.display = 'none';
}

/**
 * get id from drawer in showInfoText()
 * Toggles the 'open' class for the drawer element. 
 * When opened, adds an event listener to close the drawer on outside click.
 * 
 * @description
 * - Retrieves the drawer element using its ID (assumed to be set in showInfoText()).
 * - Utilizes closeOnClick as an event callback (not invoked directly as a function). 
 * - If the drawer is open, allows the user to click outside to close it.
 */
function toggleDrawer() {
  let drawer = document.getElementById("drawer");
  if (drawer.classList.toggle("open")) {
    document.addEventListener("click", closeOnClick);
  } else {
    document.removeEventListener("click", closeOnClick);
  }
}

/**
 * Event handler that closes the drawer when a click occurs outside of the drawer and moreBtn elements.
 * Also removes the click event listener if either drawer or moreBtn elements do not exist.
 *
 * @param {Event} event - The triggered click event.
 */
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

/**
* Closes the drawer by removing the 'open' class from the drawer element.
*/
function closeDrawer() {
  document.getElementById("drawer").classList.remove("open");
}

function keepString(id) {
  document.getElementById(id).select();
  console.log('selected id is ', id);
}

/**
 * takes index from widthForEdit(index)
 * add contact from showEditContact() into mobilePopup
 * starts checkOldValues()
 * @param {int} index 
 */
async function openEditMobile(index) {
  let indexNr = index; //Nr of contactArray
  await mobilePopup();
  let content = document.getElementById("popContent");
  content.innerHTML = showEditContact(indexNr);
  setInitialValues();
}

/**
 * takes index from widthForEdit(index)
 * add contact from showEditContact() into deskEditPopup()
 * starts checkOldValues()
 * @param {int} index 
 */
async function openEditDesk(index) {
  let indexNr = index; //Nr of contactArray
  await deskEditPopup();
  document.getElementById("popupLeft").innerHTML = showEditContact(indexNr);
  document.getElementById("popTop").style.borderTopLeftRadius = "0px";
  setInitialValues();
}

/**
 * if user doesn'edit new info take old Infos
 */

function setInitialValues() {
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

/**
 * takes index from showEditContact(index)
 * Takes elements from inputfields and push it into contactArray()
 * starts comleteEdition()
 * @param {int} index from personDatas
 */
function editContactInArray(index) {
  let name = document.getElementById("fullName").value; //.split(' ') in splitName()
  let mail = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
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

/**
 * takes index from editContactInArray(index)
 * close the popup, loadup infos to server and starts infoBox(index)
 * @param {int} index 
 */
async function completeEdition(index) {
  document.getElementById("userForm").reset();
  closePopup();
  let userId = localStorage.getItem('userId');
  await setItem('contacts' + userId, JSON.stringify(contactArray));
  showContacts();
  showInfo(index);
}

/**
 * takes index from personDatas(), 
 * showEditContact() and delete the contact 
 * @param {int} index 
 */
async function deleteInEditor(index) {
  contactArray.splice(index, 1);
  await setItem('contacts' + userId, JSON.stringify(contactArray));
  closePopup();
  showContacts();
}

/**
 * Creates a new contact entry based on the user input from the form. After the contact
 * is created, the contact creation process is finalized by calling the completeCreation function.
 */
async function createContact() {
  let createBtn = document.getElementById('createBtn');
  createBtn.disabled = true;
  let fullName = document.getElementById("fullName").value;
  let mail = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let color = document.getElementById("colorBox").style.backgroundColor;
  if (color == '') {
    color = 'var(--user-grey)';
  }
  let { preName, lastName } = splitName(fullName);
  let initials = preName[0] + lastName[0];

  contactArray.push({
    name: preName,
    lastName: lastName,
    mail: mail,
    phone: phone,
    initials: initials,
    color: color,
  });

  await completeCreation();
}

/**
 * Completes the contact creation process by re-enabling the create button, resetting 
 * the form, and saving the new contact to storage. Also, triggers a visual feedback for 
 * a successful operation.
 */
async function completeCreation() {
  createBtn.disabled = false;
  document.getElementById("userForm").reset();
  closePopup();
  let userId = localStorage.getItem('userId');
  setItem('contacts' + userId, JSON.stringify(contactArray));
  let index = contactArray.length - 1;
  showContacts();
  showInfo(index);
  successInfo();
}

/**
 * Shows a visual feedback to inform the user about a successful operation. 
 * The information message animates from the bottom to the middle of the screen 
 * and hides itself after a short duration.
 */
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

/**
 * Creates initialGroups from contactArray in templates/global_arrays.js 
 * and gives it back to showContacts()
 * if key is not exist as a letter in the accumulator,it push a new one
 * push current name to acc
 */
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

