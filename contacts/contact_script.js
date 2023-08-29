//============================================================
// SHOW NAME GROUP IN MOBILE
//============================================================

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname;

    if (currentPage.includes('contact_list')) {
        showContacts();
    } else if (currentPage.includes('contact_details')) {
        showDetails();
    }
});


function showContacts() {
    let content = document.querySelector('main');
    content.innerHTML = '';
    content.innerHTML += `
        <button class="add-btn" id="addBtn" onclick="addNewContact()">
            <img src="../assets/img/person_add.png" alt="">
        </button>
        <div class="name-group" id="nameGroup">
        </div> 
    `;
    createInitalGroup(); //in script.js
    createInitials();
    showNameGroup();
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
                    <div class="name-box" onclick="showDetails(${i})">
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

//============================================================
// SHOW DETAILS IN MOBILE
//============================================================

function showDetails(index) {
    let main = document.querySelector('main');
    main.innerHTML = '';
    let person = contactArray[index];
    main.innerHTML += `
            <!----------- DETAILS FRAME-------------------------->
            <div class="detail-frame">
                <div class="detail-head">
                    <div>Contact Informations</div>
                    <a href="contact_list.html">
                        <img src="../assets/img/arrow-left-line.svg" alt="back">
                    </a>

                </div>
                <div class="detail-name-box">
                    <div class="detail-ellipse" style="background-color: ${person.color}">
                        ${person.initials}
                    </div>
                    <div class="detail-name">
                    ${person.name} ${person.lastName}
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
            </div><!-- End detail-frame-->

            <button class="more-btn" id="moreBtn" onclick="toggleDrawer()">
                <img src="../assets/img/more_btn.svg" alt="">
            </button>

            <div id="drawer">
              <div class="drawer-item" onclick="editMobContact()">
                <img src="../assets/img/edit.png" alt="Edit">
                <span>Edit</span>
              </div>
              <div class="drawer-item" onclick="deleteContact()">
                <img src="../assets/img/delete.png" alt="Delete">
                <span>Delete</span>
              </div>
            </div>
    `;
}

//============================================================
// START TOGGLE DRAWER WITH MORE BTN
//============================================================

function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    if (drawer.classList.toggle('open')) {
      document.addEventListener('click', closeOnClick);
    } else {
      document.removeEventListener('click', closeOnClick);
    }
  }
  
  function closeOnClick(event) {
    const drawer = document.getElementById('drawer');
    const moreBtn = document.querySelector('.more-btn');
    if (!drawer.contains(event.target) && !moreBtn.contains(event.target)) {
      closeDrawer();
      document.removeEventListener('click', closeOnClick);
    }
  }
  
  function closeDrawer() {
    document.getElementById('drawer').classList.remove('open');
  }
  
  function editMobContact() {
    console.log('Editing');
    closeDrawer();
  }
  
  function deleteContact() {
    console.log('Deleting');
    closeDrawer();
  }
  

//============================================================
//SHOW EDITOR IN MOBILE
//============================================================

function showEditor() {
    let content = document.getElementById('popContent');
    content.innerHTML = '';
    content.innerHTML += `
        <div class="pop-top">                
            <a onclick="closePopup()"><img src="../assets/img/close.png" alt="close"></a>
            <span class="pop-header">Edit contact</span> 
            <span class="pop-subtitle">Tasks are better with a team!</span>        
        </div>
        <div>
        <img class="popup-circle" src="../assets/img/person_initial.png" alt="person_initial">
        </div>        
        <div class="pop-bottom">
        <div class="add-mob-form">
            <form id="userForm">
                <div class="add-mob-frame">
                    <input class="mob-input" type="text" id="nameLastName" placeholder="Name">
                    <img src="../assets/img/person_small.png" alt="name">
                </div>    
                <div class="add-mob-frame">
                    <input class="mob-input" type="text" id="email" placeholder="Email">
                    <img src="../assets/img/mail_small.png" alt="name">
                </div>    
                <div class="add-mob-frame">
                    <input class="mob-input" type="text" id="phone" placeholder="Phone">
                    <img src="../assets/img/call_small.png" alt="name">
                </div>
            </form> 
        </div>
    
        <div>
        <button class="add-mob-btn" onclick="addContactToArray()">
        Save
        <img src="../assets/img/check_small.png" alt="name">
        </button>
            <button class="add-mob-btn" onclick="addContactToArray()">
            Save
            <img src="../assets/img/check_small.png" alt="name">
            </button>
        </div>
                `;
    return content;
}

function editUser() {
    if (!document.getElementById("popupBackground")) {
        createMobilePopup();
    }
    document.getElementById("popupBackground").style.display = "block";
}

//============================================================
// SHOW NEW CONTACT IN MOBILE 
//============================================================

// has send to global adress array
let newContact = {};

async function addNewContact() {
    await createMobilePopup();
    showAddContact();
}

function showAddContact() {
    let content = document.getElementById('popContent');
    content.innerHTML = '';
    content.innerHTML += `
    <div class="pop-top">
    <a onclick="closePopup()"><img src="../assets/img/close.png" alt="close"></a>
    <span class="pop-header">Add contact</span>
    <span class="pop-subtitle">Tasks are better with a team!</span>
    </div>
    
    <div>
    <img class="popup-circle" src="../assets/img/person_initial.png" alt="person_initial">
    </div>
    
    <div class="pop-bottom">
    <div class="add-mob-form">
        <form id="userForm">
            <div class="add-mob-frame">
                <input class="add-mob-input" type="text" id="nameLastName" placeholder="Name Nachname">
                <img src="../assets/img/person_small.png" alt="name">
            </div>    
            <div class="add-mob-frame">
                <input class="add-mob-input" type="text" id="email" placeholder="Email">
                <img src="../assets/img/mail_small.png" alt="name">
            </div>    
            <div class="add-mob-frame">
                <input class="add-mob-input" type="text" id="phone" placeholder="Phone">
                <img src="../assets/img/call_small.png" alt="name">
            </div>
        </form> 
    </div>

    <div>
        <button class="add-mob-btn" onclick="addContactToArray()">
        Create Contact 
        <img src="../assets/img/check_small.png" alt="name">
        </button>
    </div>
</div>
        `;
}

function addContactToArray() {
    if (!validateForm()) {
        return;
    } else {
        let name = document.getElementById('nameLastName').value.split(' ');
        let mail = document.getElementById('email').value;
        let tel = parseInt(document.getElementById('phone').value);
        // check for TWO names
        if (name.length !== 2) {
            alert('Bitte geben Sie Vor- und Nachnamen getrennt durch ein Leerzeichen ein.');
            return;
        }
        let preName = upperCase(name[0]);
        let lastName = upperCase(name[1]);

        //in templates/global_arrays.js
        contactArray.push({
            name: preName,
            lastName: lastName,
            mail: mail,
            tel: tel,
            color: '--user-orange'
        });
        document.getElementById('userForm').reset();
    }
    closePopup();
    //finally it's goin to this contact in details
    showContacts();
}

function upperCase(name) {
    let inputName = name;
    let formattedName = inputName.charAt(0).toUpperCase() + inputName.slice(1);
    return formattedName;
}




function createMobilePopup() {
    return new Promise((resolve) => {
        let popupHTML = `
        <div class="popup-background" id="popupBackground">
            <div class="popup">            
                <div class="popup-content" id="popContent">

                </div>
            </div>
        </div>
        `;
        document.body.innerHTML += popupHTML;
        let popupBg = document.getElementById('popupBackground');
        popupBg.style.display = 'block';
        setTimeout(() => {
            resolve();
        }, 0);
    });
}


function closePopup() {
    document.getElementById("popupBackground").style.display = "none";
}