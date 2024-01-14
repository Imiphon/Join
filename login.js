let emailAdresses = [];
let resetId;

/**
 *  This function is get user and password and checkCredentials.
 *  If correct redirect to welcome message.
 */
async function login() {
  disableButtonLogin();
  let email = getInput("loginEmail");
  let password = getInput("loginPassword");
  await checkCredentials(email,password);
  resetLoginForm();
  enableButtonLogin();  
}

/**
 * This function is use to check if the credentials email and password correct.
 * @param {String} email - email adress of the user to login
 * @param {String} password password of the user to login
 */
async function checkCredentials(email,password){
  if (await checkUserExist(email)) {
    let userId = emailAdresses.indexOf(email);
    if (checkPwdCorrect(userId, password)) {
      let name = users[userId].name;
      localStorage.removeItem('myName');
      localStorage.setItem('myName', name);
      showSummaryPage(userId);

    } else {
      showPwdNotRightMessage();
    }
  } else {
    showEmailNotFoundMessage();
  }
}

/**
 * This function is use to reset all inputs from the login form.
*/
function resetLoginForm(){
  let form = document.getElementById('formLogin'); 
  form.reset();
}

/**
 * This function save the userId to localstorage and set as id for redirect.
 * @param {int} userId - UserId save to localstorage and set as id for redirect
 */
function showSummaryPage(userId){
  localStorage.setItem('userId', userId);
  let loginTime = localStorage.getItem('loginTime_'+ userId);
  if(loginTime) {
    localStorage.removeItem('loginTime_'+ userId);
  }
  window.location = `./summary/summary.html?id=${userId}`;
}

/**
 *  This function is use to create a new user. If the E-Mail is not in use.
 */
async function newUser() {
  disableButton("newUserBtn");
  let email = getInput("newEmail");
  if (!(await checkUserExist(email))) {
    await registerUser(email);
    showSignUpMessage();
    closeSignUp();
  } else {
    showSignUpAlreadyExistMessage();
  }
  resetNewUserForm();
  enableButton("newUserBtn");
}

/**
 * This function is use to reset all inputs from the new user form.
 */
function resetNewUserForm(){
  let form = document.getElementById("formNewUser");
  form.reset();
}

/**
 * This function is to create the contact array for the new registered user on the remote storage.
 * @param {int} userId - Id of the new User to create the contact array 
 */
async function createOwnContactsRemoteStorage(name, email){
  emailAdresses = await getExistingEmailAdresses();
  let userId = emailAdresses.indexOf(email);
  let array = await JSON.parse(await getItem('contacts'));
  array.push(createContactsArray(name, email, userId));
  await setItem('contacts' + userId, JSON.stringify(array));
}

/**
 * This function is use to create a contact-array with his own contact for new created user.
 * @param {String} name - name of the new registered user
 * @returns an new contact array with the new created user as contact
 */
function createContactsArray(name,email, userId){
  let {preName,lastName} = splitName(name);
  initials = preName[0] + lastName[0]; 
  let userInitials = 'userInitials' + userId;
  localStorage.setItem(userInitials, initials); 
  return [
    {
      color: "var(--user-yellow)",
      initials: initials,
      lastName: lastName,
      mail: email,
      name: preName,
      phone: 0,
      owner: true
    }
  ]; 
}

/**
 * This function is use to create the addedTask array for the new registered user on the remote storage.
 * @param {String} email - email adress of the user to search for his userId 
 */
async function createOwnTasksRemoteStorage(email){
  let userId = emailAdresses.indexOf(email);
  let addedTasks = await getItem("storedTasks");
  await setItem("storedTasks" + userId, JSON.stringify(addedTasks));
}

/**
 *  This function is to check if the SignUp can be activatet.
 */
function checkInput(){
  let name = getInput("newName");
  let email = getInput("newEmail");
  let password = getInput("newPassword");
  let newConfirmPassword = document.getElementById("newConfirmPassword");
  //let acceptPrivacy = document.getElementById("acceptPrivacy"); 

  if (name.length == 0 || email.length == 0 || password.length == 0 || newConfirmPassword.length == 0 ){
    disableButton("newUserBtn");  
    //document.getElementById('newUserBtn').style.opacity = '0.4';  
  }else{
    enableButton("newUserBtn");
    document.getElementById('newUserBtn').style.opacity = '1';
  }
}

/**
 * This function is use to login as quest user.
 * Redirect to wellcome message.
*/
function guestLogin() {
  disableButtonLogin();
  resetLoginForm();
  localStorage.setItem('userId', '');
  localStorage.removeItem('myName');
  localStorage.setItem('myName', 'dear Guest');
  let loginTime = localStorage.getItem('loginTime_'+ userId);
  if(loginTime) {
    localStorage.removeItem('loginTime_'+ userId);
  }
  window.location = `./summary/summary.html?id=-1}`;  
}

/**
 * This function is use to send the reset your password email to the user.
 * In the prototype its redirect to the reset password form.
 */
async function sendResetEmail() {
  disableButton("resetEmailBtn");
  let email = getInput("resetEmail");
  let form = document.getElementById("formResetEmail");

  if (await checkUserExist(email)) {
    showSendEmailMessage();
    closeForgotPwd();
    // In the final version here we must send the E-Mail and the resetPage only avalible over the link in the mail.
    resetId = emailAdresses.indexOf(email); 
    openResetPwd();
  } else {
    showEmailNotFoundMessage();
  }
  form.reset();
  enableButton("resetEmailBtn");
}

/**
 * This function is use to reset the password of the user.
*/
async function resetPwd() {
  disableButton("resetPwdBtn");
  let password = getInput("resetPassword");
  let form = document.getElementById("formResetPwd");
  await loadUsers();
  users[resetId]["password"] = password;
  saveUsers();
  showresetPwdMessage();
  closeResetPwd();
  form.reset();
  enableButton("resetPwdBtn");
}

/**
 * This function is use to open the login formular.
*/
function openLogin() {
  enableButtonLogin();
  let background = document.getElementById("background");
  let joinLogo = document.getElementById("joinLogo");
  let logInPage = document.getElementById("formLoginDiv");
  let loginFooter = document.getElementById("loginFooter");

  background.classList.remove("background");
  joinLogo.classList.remove("joinLogoWhite");
  loginFooter.classList.remove("d-none");
  logInPage.classList.remove("d-none");
}

/**
 * This function is use to close the login formular.
*/
function closeLogin() {
  disableButtonLogin();
  let form = document.getElementById('formLogin');
  let background = document.getElementById("background");
  let joinLogo = document.getElementById("joinLogo");
  let logInPage = document.getElementById("formLoginDiv");
  let loginFooter = document.getElementById("loginFooter");

  form.reset();
  background.classList.add("background");
  joinLogo.classList.add("joinLogoWhite");
  logInPage.classList.add("d-none");
  loginFooter.classList.add("d-none");
}

/**
 * This function is use to open the sign up formular.
*/
function openSignUp() {
  closeLogin();
  let signUpPage = document.getElementById("formNewUserDiv");
  let loginFooter = document.getElementById("loginFooter");
  
  signUpPage.classList.remove("d-none");
  loginFooter.classList.add("loginFooterWhite");
  loginFooter.classList.add("newUserFooter");
  loginFooter.classList.remove("loginFooter"); 
  loginFooter.classList.remove("d-none"); 
  disableButton("newUserBtn");
}

/**
 * This function is use to close the sign up formular.
*/
function closeSignUp() {
  let form = document.getElementById("formNewUser");
  let signUpPage = document.getElementById("formNewUserDiv");
  let loginFooter = document.getElementById("loginFooter");

  form.reset();
  signUpPage.classList.add("d-none");
  loginFooter.classList.remove("loginFooterWhite");
  loginFooter.classList.add("d-none");
  loginFooter.classList.add("loginFooter");
  loginFooter.classList.remove("newUserFooter");
  openLogin();
}

/**
 * This function is use to open the forgot password formular.
*/
function openForgotPwd() {
  closeLogin();
  let resetEmailPage = document.getElementById("formResetEmailDiv");
  resetEmailPage.classList.remove("d-none");
}

/**
 * This function is use to close the forgot password formular.
*/
function closeForgotPwd() {
  let form = document.getElementById("formResetEmail");
  let resetEmailPage = document.getElementById("formResetEmailDiv");
  form.reset();
  resetEmailPage.classList.add("d-none");
  openLogin();
}

/**
 * This function is use to open the reset password formular.
*/
function openResetPwd() {
  closeLogin();
  let resetPwdPage = document.getElementById("formResetPwdDiv");
  resetPwdPage.classList.remove("d-none");
}

/**
 * This function is use to close the reset password formular.
*/
function closeResetPwd() {
  let form = document.getElementById("formResetPwd");
  let resetPwdPage = document.getElementById("formResetPwdDiv");
  
  form.reset();
  resetPwdPage.classList.add("d-none");
  openLogin();
}

/**
 * This function is use to show messages to the user.
*/
function showMessage(html) {
  let msg = document.getElementById("message");
  msg.innerHTML = html;
  msg.classList.remove("d-none");
  setTimeout(function () {
    msg.classList.add("d-none");
  }, 3000);
}

/**
 * This function is use to check if the email adress of an user exist.
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
function checkPwdCorrect(userid, password) {
  return password == users[userid]["password"];
}

/**
 * This function is use to load the existing email adresses to an array.
* @returns email adresses from all users
 */
async function getExistingEmailAdresses() {
  await loadUsers();
  let emailAdresses = [];
  for (let i = 0; i < users.length; i++) {
    const emailAdress = users[i]["email"];
    emailAdresses.push(emailAdress);
  }
  return emailAdresses;
}

/**
 * This function is use to register a new user.
 * @param {string} name - name of the user to register.
 * @param {string} email - email of the user to register.
 * @param {string} password password of the user to register.
 */
async function registerUser(email) {
  let name = getInput("newName");
  let password = getInput("newPassword");  
  users.push({
    name: name,
    email: email,
    password: password,
  });
  await saveUsers();
  await createOwnContactsRemoteStorage(name, email);
  await createOwnTasksRemoteStorage(email);
}

/**
 * This function is use to get the value of an html tag
 * @param {string} id - id of the html tag to get the value.
 * @returns value of the html tag.
 */
function getInput(id) {
  return document.getElementById(id).value;
}

/**
 * This function is use to load the users from the remote storage.
*/
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * This function is use to save the users to the remote storage.
 */
async function saveUsers() {
  await setItem("users", JSON.stringify(users));
}

/*Validate Password Match HTML5 newUser + resetPwd*/
let newPassword = document.getElementById("newPassword"),
    newConfirmPassword = document.getElementById("newConfirmPassword"),
    resetPassword = document.getElementById("resetPassword"),
    resetConfirmPassword = document.getElementById("resetConfirmPassword");

/**
 * This function is use to check if the passwords on the sign up page match.
*/
function validatenewPassword() {
  if (newPassword.value != newConfirmPassword.value) {
    newConfirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    newConfirmPassword.setCustomValidity("");
  }
}

/**
 * This function is use to check if the passwords on the reset password page match.
 */
function validateresetPassword() {
  if (resetPassword.value != resetConfirmPassword.value) {
    resetConfirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    resetConfirmPassword.setCustomValidity("");
  }
}

newPassword.onchange = validatenewPassword;
newPassword.onfocus = showPwdMessage;
newPassword.onblur = closePwdMessage;
newPassword.onkeyup = validatePasswordMessage;
newConfirmPassword.onkeyup = validatenewPassword;
resetPassword.onchange = validateresetPassword;
resetPassword.onfocus = showPwdMessage;
resetPassword.onblur = closePwdMessage;
resetPassword.onkeyup = validatePasswordMessage;
resetConfirmPassword.onkeyup = validateresetPassword;