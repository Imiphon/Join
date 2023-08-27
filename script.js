/*************************************
 * FUNCTIONS TO CREATE INITIALS (IN CIRCLE)
 *************************************/

// initialGroups are in templates/global_arrays.js
function findInitalGroup() {
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


//to check for valid user input
function validateForm() {
    const namePattern = /^[a-zA-Z]+\s[a-zA-Z]+$/; // Akzeptiert zwei Wörter getrennt durch ein Leerzeichen
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Einfache Überprüfung für Emails
    const phonePattern = /^[0-9]{10}$/; // Akzeptiert 10 Ziffern

    const nameInput = document.getElementById('nameLastName').value;
    const emailInput = document.getElementById('email').value;
    const phoneInput = document.getElementById('phone').value;

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

    // Wenn alles gültig ist:
    return true;
}
