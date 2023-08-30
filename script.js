//=============================================
// FUNCTIONS TO CREATE INITIALS (IN CIRCLE)
//=============================================

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

//they will pushed in contactArrays
function createInitials() { 
    for (let i = 0; i < contactArray.length; i++) {
        let person = contactArray[i];
        let initials = person.name[0] + person.lastName[0];
        contactArray[i].initials = initials;
    }    
}
//=============================================
//to check for valid user input
//=============================================
// check after NEW CONTACT
function validateForm() {
    let namePattern = /^[a-zA-Z]+\s[a-zA-Z]+$/; // accept two words
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // email check
    let phonePattern = /^\+?\d{2,4}[-.\s]?\d{1,15}$/;

    let nameInput = document.getElementById('fullName').value;
    let emailInput = document.getElementById('email').value;
    let phoneInput = document.getElementById('phone').value;

    if (!namePattern.test(nameInput)) {
        alert('Bitte geben Sie einen gültigen Name und Nachname ein.');
        return false;
    }

    if (!emailPattern.test(emailInput)) {
        alert('Bitte geben Sie eine gültige Emailadresse ein.');
        return false;
    }

    if (!phonePattern.test(phoneInput)) {
        alert('Bitte geben Sie eine gültige Telefonnummer ein.');
        return false;
    }
    // if all right:
    return true;
}

// check after EDIT CONTACT

function validateEditForm() {
    let namePattern = /^[a-zA-Z]+\s[a-zA-Z]+$/; // accept two words
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // email check
    let phonePattern = /^\+?\d{2,4}[-.\s]?\d{1,15}$/;

    let nameInputField = document.getElementById('fullName');
    let emailInputField = document.getElementById('email');
    let phoneInputField = document.getElementById('phone');

    let nameInput = nameInputField.value ? nameInputField.value : nameInputField.placeholder;
    let emailInput = emailInputField.value ? emailInputField.value : emailInputField.placeholder;
    let phoneInput = phoneInputField.value ? phoneInputField.value : phoneInputField.placeholder;

    if (!namePattern.test(nameInput)) {
        alert('Bitte geben Sie einen gültigen Name und Nachname ein.');
        return false;
    }

    if (!emailPattern.test(emailInput)) {
        alert('Bitte geben Sie eine gültige Emailadresse ein.');
        return false;
    }

    if (!phonePattern.test(phoneInput)) {
        alert('Bitte geben Sie eine gültige Telefonnummer ein.');
        return false;
    }
    // if all right:
    return true;
}

//=============================================
// COLORS
//=============================================

let userColors = {
    orange: 'var(--user-orange)',
    lila: 'var(--user-lila)',
    blue:  'var(--user-blue)',
    rose: 'var(--user-rose)',
    yellow: 'var(--user-yellow)',
    green: 'var(--user-green)',
    red: 'var(--user-red)',
    turquoise: 'var(--user-turquoise)',
}