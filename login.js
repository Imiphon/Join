let users = [];
let emailAdresses = [];
let resetId = [];

async function login() {
    disableButtonLogin();
    let email = getInput('loginEmail');
    let password = getInput('loginPassword');
    
    if(!await checkUserExist(email)){
        if (password == users[emailAdresses.indexOf(email)]['password']){
            window.location = "./summary/summary.html";
        }else{
            showPwdNotRightMessage();
        }
    }else{
        showEmailNotFoundMessage();
    }
    enableButtonLogin();    
    /* 
        - Anmeldung merken?
        - Weitergabe Benutzer für add_Task / Contacts...
        - Weiterleitung auf Summary
    */
}

async function newUser() {
    disableButton('newUserBtn');
    let name = getInput('newName');
    let email = getInput('newEmail');
    let password = getInput('newPassword');
        
    if(await checkUserExist(email)){
        await registerUser(name,email,password);
        showSignUpMessage();
        closeSignUp();        
    }else{
        showSignUpAlreadyExistMessage()
    }    
    enableButton('newUserBtn');
    /*
        - (Validierung der E-Mail Adresse per link?)
        - Kontakt erstellen?
    */    
}

function guestLogin() {
    disableButtonLogin();
    console.log("Test");
    window.location = "./summary/summary.html";
}

async function resetEmail() {
    disableButton('resetEmailBtn');
    let email = getInput('resetEmail');   
    
    if(!await checkUserExist(email)){
        showSendEmailMessage();
        //openResetPwd(emailAdresses.indexOf(email));
        //closeForgotPwd();
    }else{
        showEmailNotFoundMessage();        
    }
    enableButton('resetEmailBtn');
}

async function resetPwd() {
    disableButton('resetPwdBtn');
    let password = getInput('resetPassword');
    
    await loadUsers();
    users[resetId]['password'] = password; //0 muss zu ID from Webadresse query oder array Weblinktoken
    saveUsers();
    showresetPwdMessage();
    closeResetPwd();
    enableButton('resetPwdBtn');
}

function openLogin() {
    enableButtonLogin();
    let background = document.getElementById('background');
    let joinLogo = document.getElementById('joinLogo');
    let logInPage = document.getElementById('formLogin');
    let loginFooter = document.getElementById('loginFooter');
    
    background.classList.remove('background');
    joinLogo.classList.remove('joinLogoWhite');
    loginFooter.classList.remove('d-none');    
    logInPage.classList.remove('d-none');
}

function closeLogin() {
    disableButtonLogin();
    let background = document.getElementById('background');
    let joinLogo = document.getElementById('joinLogo'); 
    let logInPage = document.getElementById('formLogin');
    let loginFooter = document.getElementById('loginFooter');

    background.classList.add('background')
    joinLogo.classList.add('joinLogoWhite')
    logInPage.classList.add('d-none');
    loginFooter.classList.add('d-none');
}

function openSignUp() {
    closeLogin();
    let signUpPage = document.getElementById('formNewUser');
    let loginFooter = document.getElementById('loginFooter');
    signUpPage.classList.remove('d-none');    
    loginFooter.classList.add('loginFooterWhite');
}

function closeSignUp() {
    let signUpPage = document.getElementById('formNewUser');
    let loginFooter = document.getElementById('loginFooter');
    signUpPage.classList.add('d-none');
    loginFooter.classList.remove('loginFooterWhite');
    openLogin();
}

function openForgotPwd() {
    closeLogin();
    let resetEmailPage = document.getElementById('formResetEmail');
    resetEmailPage.classList.remove('d-none');    
}

function closeForgotPwd() {
    let resetEmailPage = document.getElementById('formResetEmail');
    resetEmailPage.classList.add('d-none');
    openLogin();    
}

function openResetPwd(id) {
    resetId = id;    
    closeLogin();
    let resetPwdPage = document.getElementById('formResetPwd');
    resetPwdPage.classList.remove('d-none');
}

function closeResetPwd() {    
    let resetPwdPage = document.getElementById('formResetPwd');
    resetPwdPage.classList.add('d-none');
    openLogin();
}

function showMessage(html) {
    let msg = document.getElementById('message');
    msg.innerHTML = html;
    msg.classList.remove('d-none');
    setTimeout(function(){
        msg.classList.add('d-none');
    },3000);
}

function showPwdNotRightMessage() {
    let html =`
        <p>Your Password are wrong</p> 
    `
    showMessage(html);
}
function showSendEmailMessage() {
   let html = `
        <img src="./assets/img/SendCheck.svg">
        <p>An E-Mail has been send to you</p> 
    `
    showMessage(html);
}
function showEmailNotFoundMessage() {
    let html =`
        <p>Your email address was not found</p> 
    `
    showMessage(html);
}
function showSignUpMessage() {
    let html = `
        <p>You Signed Up successfully</p> 
    `
    showMessage(html);
}
function showSignUpAlreadyExistMessage() {
    let html = `
        <p>Your email already in use</p> 
    `
    showMessage(html);
}
function showresetPwdMessage() {
    let html =`
        <p>You reset your password</p> 
    `
    showMessage(html);
}

async function checkUserExist(email) {
    emailAdresses = await getExistingEmailAdresses();
    return !emailAdresses.includes(email);
}

async function getExistingEmailAdresses() {
    await loadUsers();
    let emailAdresses= [];
    for (let i = 0; i < users.length; i++) {
        const emailAdress = users[i]['email'];
        emailAdresses.push(emailAdress);
    }
    return emailAdresses;
}

async function registerUser(name,email,password) {
    users.push({
        name: name,
        email: email,
        password: password,
    });
    saveUsers();
}

function getInput(id) {
    return document.getElementById(id).value;
}

function disableButtonLogin() {
    disableButton('forgotPwd');
    disableButton('rememberMe');
    disableButton('userLoginBtn');
    disableButton('guestLoginBtn');
    disableButton('signUp');
}

function enableButtonLogin() {
    enableButton('forgotPwd');
    enableButton('rememberMe');
    enableButton('userLoginBtn');
    enableButton('guestLoginBtn');
    enableButton('signUp');
}

function disableButton(buttonId) {
    let button = document.getElementById(buttonId);
    button.disabled = true;
}

function enableButton(buttonId) {
    let button = document.getElementById(buttonId);
    button.disabled = false;
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

async function saveUsers() {
    await setItem('users', JSON.stringify(users));
}


/*Validate Password Match HTML5 newUser + resetPwd*/
let newPassword = document.getElementById("newPassword")
    , newConfirmPassword = document.getElementById("newConfirmPassword")
    , resetPassword = document.getElementById("resetPassword")
    , resetConfirmPassword = document.getElementById("resetConfirmPassword");

function validatenewPassword() {    
  if(newPassword.value != newConfirmPassword.value) {
    newConfirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    newConfirmPassword.setCustomValidity('');
  }
}

function validateresetPassword() {    
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