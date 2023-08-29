function login(){
    disableButtonLogin();
    let email = getInput('loginEmail');
    let password = getInput('loginPassword');
    console.log('login');
    /* 
        - Login Daten Validieren -> Meldung User nicht gefunden wenn nicht gefunden.
        - Anmeldung merken?
        - Weiterleitung auf Summary
       
    */
}

function openSignUp() {
    disableButtonLogin();
    /*
        - Sign up page anzeigen
    */
}

function newUser() {
    disableButton('newUserBtn');
    let name = getInput('newName');
    let email = getInput('newEmail');
    let password = getInput('newPassword');
    
    console.log('newUser')

    /*
        - Validieren das es den User noch nicht gibt.
        - Push zum array
        - (Validierung der E-Mail Adresse)
        - Kontakt erstellen?
        - Bestätigung zur anlage des Benutzers
    */    
}

function guestLogin(){
    disableButtonLogin();
    console.log('guestLogin');
    /*
        - Gast Login (weiterleitung auf Summary schauen aber nicht anfassen?)
    */
}

function openForgotPwd() {
    disableButtonLogin();
    /*
        - resetEmail page anzeigen
    */
}

function resetEmail() {
    let email = getInput('resetEmail');   
    console.log('resetE-Mail');
    /*
    - Validierung E-Mail vorhanden
    - E-Mail zum zurücksetzen versenden  
    - Bestätigung Kennwort geändert anzeigen oder E-Mail nicht gefunden
    */
}

function resetPwd(userId){
    let password = getInput('resetPassword');
    console.log('resetPwd');
    /*
    - neues Kennwort in Datenbank hinterlegen
    - Bestätigung Kennwort geändert anzeigen
    */
}

function getInput(id){
    return document.getElementById(id).value;
}

function disableButtonLogin(){
    disableButton('forgotPwd');
    disableButton('rememberMe');
    disableButton('userLoginBtn');
    disableButton('guestLoginBtn');
    disableButton('signUp');
}

function disableButton(buttonId){
    button = document.getElementById(buttonId);
    button.disabled = true;
}

function enableButton(buttonId){
    button = document.getElementById(buttonId);
    button.disabled = false;
}

/*Remote Storage Implementierung*/
const STORAGE_TOKEN = 'F4LGRNFMG9GWI4STVSTG89MGMCVVVRZDK3KPVIVF';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

/*Validate Password HTML5 newUser + resetPwd*/
let newPassword = document.getElementById("newPassword")
    , newConfirmPassword = document.getElementById("newConfirmPassword")
    , resetPassword = document.getElementById("resetPassword")
    , resetConfirmPassword = document.getElementById("resetConfirmPassword");

function validatenewPassword(){    
  if(newPassword.value != newConfirmPassword.value) {
    newConfirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    newConfirmPassword.setCustomValidity('');
  }
}

function validateresetPassword(){    
    if(resetPassword.value != resetConfirmPassword.value) {
        resetConfirmPassword.setCustomValidity("Passwords Don't Match");
    } else {
        resetConfirmPassword.setCustomValidity('');
    }
  }

newPassword.onchange = validatenewPassword;
newConfirmPassword.onkeyup = validatenewPassword;
resetPassword.onchange = validateresetPassword;
resetConfirmPassword.onkeyup = validateresetPassword;