/*****************************
 * FUNCTIONS FOR CONTACTS
 ******************************/
//await end of loading contacts.html
document.addEventListener("DOMContentLoaded", function() {
    showContacts();
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
    findInitalGroup(); //
    showNameGroup();
}

// showNameGroup with inside create initials

function showNameGroup() {
    let content = document.getElementById('nameGroup'); 
    content.innerHTML = ''; 
    for (let initial in initialGroups) {
        content.innerHTML += `
            <div class="letter-box">
                <span id="letterBox">${initial}</span>
            </div>
            <div class="line-box">
                <div class="line"> </div>
            </div>
        `;

        initialGroups[initial].forEach(person => {
            let initials = person.name[0] + person.lastName[0];
            content.innerHTML += `
                <div class="name-frame">
                    <div class="name-box" onclick="contactDetails()">
                        <div class="name-ellipse" id="initials">
                            ${initials}
                        </div>
                        <div class="name-mail-frame">
                            <div class="full-name">
                                ${person.name} ${person.lastName}
                            </div>
                            <div class="mail" id="mail">
                                ${person.mail}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}

/*******************************
 * FUNCTIONS FOR DETAILS
 ********************************/
function contactDetails() {
    console.log('contactDetails() starts');
}

/*************************************
 * FUNCTIONS FOR EDIT CONTACT
 *************************************/

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

/*************************************
 * FUNCTIONS FOR NEW CONTACT
 *************************************/

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

            </div>
    `;
}

function addName() {
    let inputName = document.getElementById('nameInput').value;
    let formattedName = inputName.charAt(0).toUpperCase() + inputName.slice(1);
    newContact.name = formattedName;
}

