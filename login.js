let users = [];
let emailAdresses = [];

async function login(){
    disableButtonLogin();
    let email = getInput('loginEmail');
    let password = getInput('loginPassword');
    
    if(!await checkUserExist(email)){
        if (password == users[emailAdresses.indexOf(email)]['password']){
            console.log('Anmeldung erfolgreich');
        }else{
            console.log('Password falsch');
        }
    }else{
        console.log('E-Mail adresse nicht vorhanden!');
    }
    
    /* 
        - Anmeldung merken?
        - Weitergabe für add_Task / Contacts...
        - Meldung wenn E-Mail oder Password falsch
        - Weiterleitung auf Summary
    */
}

function openSignUp() {
    disableButtonLogin();
    let background = document.getElementById('background');
    let joinLogo = document.getElementById('joinLogo');
    let signUpPage = document.getElementById('formNewUser');
    let logInPage = document.getElementById('formLogin');

    background.classList.add('background')
    joinLogo.classList.add('joinLogoWhite')
    logInPage.classList.add('d-none');
    signUpPage.classList.remove('d-none');
}

function closeSignUp() {
    enableButtonLogin();
    let background = document.getElementById('background');
    let joinLogo = document.getElementById('joinLogo');
    let signUpPage = document.getElementById('formNewUser');
    let logInPage = document.getElementById('formLogin');
        
    background.classList.remove('background')
    joinLogo.classList.remove('joinLogoWhite')
    logInPage.classList.remove('d-none');
    signUpPage.classList.add('d-none');
}

async function newUser() {
    disableButton('newUserBtn');
    let name = getInput('newName');
    let email = getInput('newEmail');
    let password = getInput('newPassword');
        
    if(await checkUserExist(email)){
        await registerUser(name,email,password);
        showSignupMessage();
        
    }else{
        console.log('Bereits vorhanden!');
    }

    /*
        - (Validierung der E-Mail Adresse per link?)
        - Kontakt erstellen?
        - Bestätigung zur anlage des Benutzers oder info schon vorhanden
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
    let background = document.getElementById('background');
    let joinLogo = document.getElementById('joinLogo');
    let resetEmailPage = document.getElementById('formResetEmail');
    let logInPage = document.getElementById('formLogin');

    background.classList.add('background')
    joinLogo.classList.add('joinLogoWhite')
    logInPage.classList.add('d-none');
    resetEmailPage.classList.remove('d-none');
}

async function resetEmail() {
    disableButton('resetEmailBtn');
    let email = getInput('resetEmail');   
    
    if(!await checkUserExist(email)){
        console.log('E-Mail mit Link zum zurücksetzen versenden!')
        //ID = emailAdresses.indexOf(email)
    }else{
        console.log('E-Mail adresse nicht gefunden!');
    }
    
    /*
    - E-Mail zum zurücksetzen versenden  
    - E-Mail versendet anzeigen oder E-Mail adresse nicht gefunden
    */
}

async function resetPwd(userId){
    disableButton('resetPwdBtn');
    let password = getInput('resetPassword');
    
    await loadUsers();
    users[0]['password'] = password; //0 muss zu ID from Webadresse query
    saveUsers();
    console.log('password wurde geändert!');

    /*
    - Bestätigung Kennwort geändert anzeigen
    */
}

function showSignupMessage(){
    let msg = document.getElementById('message');
    msg.classList.remove('d-none');
    setTimeout(function(){
        msg.classList.add('d-none');
        closeSignUp();
    },3000);
}


async function checkUserExist(email){
    emailAdresses = await getExistingEmailAdresses();
    return !emailAdresses.includes(email);
}

async function getExistingEmailAdresses(){
    await loadUsers();
    let emailAdresses= [];
    for (let i = 0; i < users.length; i++) {
        const emailAdress = users[i]['email'];
        emailAdresses.push(emailAdress);
    }
    return emailAdresses;
}

async function registerUser(name,email,password){
    users.push({
        name: name,
        email: email,
        password: password,
    });
    await setItem('users', JSON.stringify(users));
}

async function saveUsers(){
    await setItem('users', JSON.stringify(users));
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

function enableButtonLogin(){
    enableButton('forgotPwd');
    enableButton('rememberMe');
    enableButton('userLoginBtn');
    enableButton('guestLoginBtn');
    enableButton('signUp');
}

function disableButton(buttonId){
    let button = document.getElementById(buttonId);
    button.disabled = true;
}

function enableButton(buttonId){
    let button = document.getElementById(buttonId);
    button.disabled = false;
}

/*Remote Storage Implementierung*/
const STORAGE_TOKEN = 'F4LGRNFMG9GWI4STVSTG89MGMCVVVRZDK3KPVIVF';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

async function setItem(key, value) {
    const payload = {key, value, token: STORAGE_TOKEN};
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
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