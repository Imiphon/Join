



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

// showNameGroup with inside create initials

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

        for (let i = 0; i < initialGroups[initial].length; i++) {
            let person = initialGroups[initial][i];
            content.innerHTML += `
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
}



function showDetails(index) {
    let main = document.querySelector('main');
    main.innerHTML ='';
    let person = contactArray[index];
    main.innerHTML += `
    <button class="add-btn" id="addBtn" onclick="editUser()">
                <img src="../assets/img/more_btn.svg" alt="">
            </button>
            <!----------- DETAILS FRAME-------------------------->
            <div class="detail-frame">
                <div class="detail-head">
                    <div>Contact Informations</div>
                    <a href="contact_list.html">
                        <img src="../assets/img/arrow-left-line.svg" alt="back">
                    </a>

                </div>
                <div class="detail-name-box">
                    <div class="detail-ellipse">
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
    `;
}



function showEditor() {
    let content = document.getElementById('popContent');
    content.innerHTML = '';
    content.innerHTML += `
        <div class="pop-top">                
            <a onclick="closePopup()"><img src="../assets/img/close.png" alt="close"></a>
            <span class="pop-header">Edit contact</span> 
            <span class="pop-subtitle">Tasks are better with a team!</span>        
        </div>
        <div class="popup-circle">

        </div>
        <div class="pop-bottom">
        
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
    
    <div class="popup-circle">

    </div>
    
    <div class="pop-bottom">
        <div class="add-contact-box">
            <form id="userForm">
                <div>
                    <label for="name">Name und Nachname:</label>
                    <input type="text" id="nameLastName" placeholder="Name Nachname">
                </div>    
                <div>
                    <label for="email">Email:</label>
                    <input type="text" id="email" placeholder="example@example.com">
                </div>    
                <div>
                    <label for="phone">Telefon:</label>
                    <input type="text" id="phone" placeholder="0123456789">
                </div>
            </form>    
            <div class="btn-box">
                <button onclick="addContactToArray()">Create Contact</button>
            </div>
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