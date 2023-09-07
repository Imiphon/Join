let users = [];
let emailAdresses = [];
let resetId;

/**
 *  This function is use to check if the credentials email and password correct. 
 *  If correct redirect to welcome message.
 * 
 */
async function login() {
    disableButtonLogin();
    let email = getInput('loginEmail'); 
    let password = getInput('loginPassword');
    if(await checkUserExist(email)){        
        if (checkPwdCorrect(email, password)){
            window.location = "./templates/welcome_message.html";
        }else{
            showPwdNotRightMessage();
        }
    }else{
        showEmailNotFoundMessage();
    }
    enableButtonLogin();    
}

/**
 *  This function is use to create a new user. If the E-Mail is not in use.
 * 
 * 
 */
async function newUser() {
    disableButton('newUserBtn');
    let name = getInput('newName');
    let email = getInput('newEmail');
    let password = getInput('newPassword');

    if(!await checkUserExist(email)){
        await registerUser(name,email,password);
        showSignUpMessage();
        closeSignUp();        
    }else{
        showSignUpAlreadyExistMessage()
    }    
    enableButton('newUserBtn');
}

/**
 * This function is use to login as quest user. 
 * Redirect to wellcome message.
 * 
 */
function guestLogin() {
    disableButtonLogin();
    console.log("Test");
    window.location = "./templates/welcome_message.html";
}

/**
 * This function is use to send the reset your password email to the user.
 * In the prototype its redirect to the reset password form.
 * 
 */
async function sendResetEmail() {
    disableButton('resetEmailBtn');
    let email = getInput('resetEmail');   
    
    if(await checkUserExist(email)){
        showSendEmailMessage();
        closeForgotPwd();
        resetId = emailAdresses.indexOf(email);
        openResetPwd();        
    }else{
        showEmailNotFoundMessage();        
    }
    enableButton('resetEmailBtn');
}

/**
 * This function is use to reset the password of the user.
 *  
 */
async function resetPwd() {
    disableButton('resetPwdBtn');
    let password = getInput('resetPassword');
    await loadUsers();
    users[resetId]['password'] = password;
    saveUsers();
    showresetPwdMessage();
    closeResetPwd();
    enableButton('resetPwdBtn');
}

/**
 * This function is use to open the login formular.
 * 
 */
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

/**
 * This function is use to close the login formular.
 * 
 */
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

/**
 * This function is use to open the sign up formular.
 * 
 */
function openSignUp() {
    closeLogin();
    let signUpPage = document.getElementById('formNewUser');
    let loginFooter = document.getElementById('loginFooter');
    signUpPage.classList.remove('d-none');    
    loginFooter.classList.add('loginFooterWhite');
}

/**
 * This function is use to close the sign up formular.
 * 
 */
function closeSignUp() {
    let signUpPage = document.getElementById('formNewUser');
    let loginFooter = document.getElementById('loginFooter');
    signUpPage.classList.add('d-none');
    loginFooter.classList.remove('loginFooterWhite');
    openLogin();
}

/**
 * This function is use to open the forgot password formular.
 * 
 */
function openForgotPwd() {
    closeLogin();
    let resetEmailPage = document.getElementById('formResetEmail');
    resetEmailPage.classList.remove('d-none');    
}

/**
 * This function is use to close the forgot password formular.
 * 
 */
function closeForgotPwd() {
    let resetEmailPage = document.getElementById('formResetEmail');
    resetEmailPage.classList.add('d-none');
    openLogin();    
}

/**
 * This function is use to open the reset password formular.
 * 
 */
function openResetPwd() {   
    closeLogin();
    let resetPwdPage = document.getElementById('formResetPwd');
    resetPwdPage.classList.remove('d-none');
}

function closeResetPwd() {    
    let resetPwdPage = document.getElementById('formResetPwd');
    resetPwdPage.classList.add('d-none');
    openLogin();
}

/**
 * This function is use to show messages to the user.
 * 
 */
function showMessage(html) {
    let msg = document.getElementById('message');
    msg.innerHTML = html;
    msg.classList.remove('d-none');
    setTimeout(function(){
        msg.classList.add('d-none');
    },3000);
}

/**
 * This function is use to define the password not right message.
 * The function showMessage() shows the message on the screen.  
 * 
 */
function showPwdNotRightMessage() {
    let html =`
        <p>Your Password are wrong</p> 
    `
    showMessage(html);
}

/**
 * This function is use to define the email has been send message.
 * The function showMessage() shows the message on the screen.  
 * 
 */
function showSendEmailMessage() {
   let html = `
        <img src="./assets/img/SendCheck.svg">
        <p>An E-Mail has been send to you</p> 
    `
    showMessage(html);
}

/**
 * This function is use to define the email not found message.
 * The function showMessage() shows the message on the screen.  
 * 
 */
function showEmailNotFoundMessage() {
    let html =`
        <p>Your email address was not found</p> 
    `
    showMessage(html);
}

/**
 * This function is use to define the sign up message.
 * The function showMessage() shows the message on the screen.  
 * 
 */
function showSignUpMessage() {
    let html = `
        <p>You Signed Up successfully</p> 
    `
    showMessage(html);
}

/**
 * This function is use to define the already exist message.
 * The function showMessage() shows the message on the screen.  
 * 
 */
function showSignUpAlreadyExistMessage() {
    let html = `
        <p>Your email already in use</p> 
    `
    showMessage(html);
}

/**
 * This function is use to define the password has been reset message.
 * The function showMessage() shows the message on the screen.  
 * 
 */
function showresetPwdMessage() {
    let html =`
        <p>You reset your password</p> 
    `
    showMessage(html);
}

/**
 * This function is use to check if the email adress of an user exist.
 * 
 * @param {string} email - email adress of the user to check if exist.
 * @returns true if user exist, false if user not exist.
 */
async function checkUserExist(email) {
    emailAdresses = await getExistingEmailAdresses();
    return emailAdresses.includes(email);
}

/**
 * This function is use to check if the is correct.
 * @param {string} password - password to check if is correct.
 * @returns true if password correct, false if password not correct.
 */
function checkPwdCorrect(email, password) {    
    return password == users[emailAdresses.indexOf(email)]['password'];
}

/**
 * This function is use to load the existing email adresses to an array.  
 * 
 * @returns email adresses from all users
 */
async function getExistingEmailAdresses() {
    await loadUsers();
    let emailAdresses= [];
    for (let i = 0; i < users.length; i++) {
        const emailAdress = users[i]['email'];
        emailAdresses.push(emailAdress);
    }
    return emailAdresses;
}

/**
 * This function is use to register a new user.
 * 
 * @param {string} name - name of the user to register.
 * @param {string} email - email of the user to register.
 * @param {string} password password of the user to register.
 */
async function registerUser(name,email,password) {
    users.push({
        name: name,
        email: email,
        password: password,
    });
    saveUsers();
}

/**
 * This function is use to get the value of an html tag
 * 
 * @param {string} id - id of the html tag to get the value.
 * @returns value of the html tag.
 */
function getInput(id) {
    return document.getElementById(id).value;
}

/**
 * This function is use to disable the buttons on the login form.
 * 
 *
 */
function disableButtonLogin() {
    disableButton('forgotPwd');
    disableButton('rememberMe');
    disableButton('userLoginBtn');
    disableButton('guestLoginBtn');
    disableButton('signUp');
}

/**
 * This function is use to enable the buttons on the login form.
 * 
 */
function enableButtonLogin() {
    enableButton('forgotPwd');
    enableButton('rememberMe');
    enableButton('userLoginBtn');
    enableButton('guestLoginBtn');
    enableButton('signUp');
}

/**
 * This function is use to diable a html button.
 * 
 * @param {string} buttonId - id of the html button to disable.
 */
function disableButton(buttonId) {
    let button = document.getElementById(buttonId);
    button.disabled = true;
}

/**
 * This function is use to enable a html button.
 * 
 * @param {string} buttonId - id of the html button to enable.
 */
function enableButton(buttonId) {
    let button = document.getElementById(buttonId);
    button.disabled = false;
}

/**
 * This function is use to load the users from the remote storage. 
 * 
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

/**
 * This function is use to save the users to the remote storage.
 * 
 */
async function saveUsers() {
    await setItem('users', JSON.stringify(users));
}


/*Validate Password Match HTML5 newUser + resetPwd*/
let newPassword = document.getElementById("newPassword")
    , newConfirmPassword = document.getElementById("newConfirmPassword")
    , resetPassword = document.getElementById("resetPassword")
    , resetConfirmPassword = document.getElementById("resetConfirmPassword");

/**
 * This function is use to check if the passwords on the sign up page match.
 * 
 */
function validatenewPassword() {    
  if(newPassword.value != newConfirmPassword.value) {
    newConfirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    newConfirmPassword.setCustomValidity('');
  }
}

/**
 * This function is use to check if the passwords on the reset password page match.
 * 
 */
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