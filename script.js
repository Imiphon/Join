let userId = localStorage.getItem('userId');
let prio = undefined; //To save the priority-value

/*Remote Storage Implementierung*/
const STORAGE_TOKEN = "F4LGRNFMG9GWI4STVSTG89MGMCVVVRZDK3KPVIVF";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}

/**
 * used in help-, imprint- and privacy.html
 */
function historyBack() {
  window.history.back();
}

/**
 * load contacts from server
 * checks for arrays in the array
 */
async function getContactsFromServer() {
  //let userId = localStorage.getItem('userId');
  if (userId != '') {
    try {
      contactArray = await JSON.parse(await getItem('contacts' + userId));
      if (Array.isArray(contactArray) && contactArray.some(Array.isArray)) {
        replaceArrWithObj();
      }
    } catch (e) {
      console.info('could not find contacts')
    }
  } else {
    contactArray = await JSON.parse(await getItem('contacts' + userId));
  }
  await sortContacts();
  showContacts();
}

/**
 * replace the array with object inside.
 */
function replaceArrWithObj() {
  contactArray = contactArray.map(innerArray =>
    Array.isArray(innerArray) && innerArray.length > 0 ? innerArray[0] : innerArray
  );
}

/**
 * Called from include-html.js
 * Shows the Initials of user in the header
 */
async function showNavInits() {
  let initialsElement = document.getElementById('userNameDivInnerId');
  let fullName = localStorage.getItem('myName');
  if (fullName) {
    let {preName,lastName} = splitName(fullName);
    initials = preName[0] + lastName[0];
    initialsElement.innerHTML = initials;
  } else {
    initialsElement.innerHTML = 'XY';
  }
}

/**
 * split the entry from the user into pre- and lastname
 * @param {string} fullName - fullname of the user
 * @returns the first and the lastname of the user
 */
function splitName(fullName) {
if (fullName != null){
  let nameParts = fullName.split(" ");
  let preName = upperCaseFirstLetter(nameParts[0]);
  let lastName = upperCaseFirstLetter(nameParts[1]);
  return {preName,lastName};
} else {
  return;
}
}

/**
 * This function is use to get the first letter of a string as upper case.
 * @param {String} str - string to get the first letter as upper case
 * @returns first letter of a string as upper case
 */
function upperCaseFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

