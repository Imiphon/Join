//THIS ARRAY HAS TO BE ON A SERVER
let serverArray = [
    {name:'Anton', lastName:'Anfang', mail:'anton@mail.com', tel:49179111, color:'--user-orange'},
    {name:'Ali', lastName:'Berg', mail:'ali@mail.com', tel:49176000, color:'--user-blue'},
    {name:'Berta', lastName:'Anfang', mail:'berta@mail.com', tel:49176000, color:'--user-yellow'},
    {name:'Bert', lastName:'Berg', mail:'bert@mail.com', tel:49176000, color:'--user-lila'},
    {name:'Cesar', lastName:'Anfang', mail:'cesar@mail.com', tel:49176000, color:'--user-red'},
    {name:'Dora', lastName:'Berg', mail:'dora@mail.com', tel:49176000, color:'--user-rose'},
    {name:'Emil', lastName:'Anfang', mail:'emil@mail.com', tel:49176000, color:'--user-turquoise'},
]

let initialGroups = [];

document.addEventListener("DOMContentLoaded", function() {
    showContacts();
});

function showContacts() {
    let content = document.querySelector('main');
    content.innerHTML = '';
    content.innerHTML += `
        <button class="add-btn" id="addBtn" onclick="addContact()">
            <img src="../assets/img/person_add.png" alt="">
        </button>
        <div class="name-group" id="nameGroup">
        </div> 
    `;
    findInitalGroup();
    showNameGroup();
}

function findInitalGroup() {
    initialGroups = serverArray.reduce((acc, current) => {
        let initial = current.name[0].toUpperCase();    
        // if key not exist as a letter in the accumulator, push it
        if (!acc[initial]) {
            acc[initial] = [];
        }    
        // push current name to acc
        acc[initial].push(current);    
        return acc;
    }, {});
    
    console.log(initialGroups);
    
}

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
                    <div class="name-box" onclick="nameDetails()">
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



function createPopup() {
    let popupHTML = `
    <div class="popup-background" id="popupBackground">
        <div class="popup">            
            <div class="popup-content" id="popContent">
                
            </div>
        </div>
    </div>
    `;
    // Popup-HTML to doc
    document.body.innerHTML += popupHTML;
}

function editUser() {
    if (!document.getElementById("popupBackground")) {
        createPopup();
    }
    document.getElementById("popupBackground").style.display = "block";
}
function addContact() {
    if (!document.getElementById("popupBackground")) {
        createPopup();
    }
    document.getElementById("popupBackground").style.display = "block";
}
function closePopEdit() {
    document.getElementById("popupBackground").style.display = "none";
}

function showEditor(l, name, num, adr) {
    let content = document.getElementById('popContent');
    content.innerHTML = '';
    content.innerHTML += `
        <div class="pop-top">                
            <a onclick="closePopEdit()"><img src="../assets/img/close.png" alt="close"></a>
                    
        </div>
        <div class="popup-circle">

        </div>
        <div class="pop-bottom">
        
        </div>
                `;
    return content;
}