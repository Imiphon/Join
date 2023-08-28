/*************************************
 * FUNCTIONS TO CREATE INITIALS (IN CIRCLE)
 *************************************/

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

//to check for valid user input
function validateForm() {
    let namePattern = /^[a-zA-Z]+\s[a-zA-Z]+$/; // accept two words
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // email check
    let phonePattern = /^[0-9]{10}$/; // checked for 10 characters at the moment

    let nameInput = document.getElementById('nameLastName').value;
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
