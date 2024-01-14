/**
 * Toggles the visibility of the color picker and updates its content.
 */
function openColorPicker() {
  let colorPicker = document.getElementById("colorPicker");

  if (colorPicker.style.display === "none") {
    colorPicker.style.display = "flex";
  } else {
    colorPicker.style.display = "none";
  }
  updateColors();
}

/**
* Updates the content of the color picker with available user colors.
*/
function updateColors() {
  let colorPicker = document.getElementById("colorPicker");
  colorPicker.innerHTML = colorsInPicker();
}

/**
* Constructs the inner HTML for the color picker based on available user colors.
*
* @returns {string} The HTML string representing color options for the picker.
*/
function colorsInPicker() {
  let pickerBox = "";
  for (let color in userColors) {
    pickerBox += `
          <div class="color-option" 
          style="background-color: ${userColors[color]};" 
          onclick="setColor('${color}', event)"></div>
          `;
  }
  return pickerBox;
}

/**
* Sets the background color of the specified element based on the selected user color.
* Hides the color picker and updates the background color of the editor's detail ellipse if it exists.
*
* @param {string} color - The key representing the user color.
* @param {Event} event - The click event triggering this function.
*/
function setColor(color, event) {
  document.getElementById("colorBox").style.backgroundColor = userColors[color];

  let colorPicker = document.getElementById("colorPicker");
  colorPicker.style.display = "none";
  event.stopPropagation();
  if (document.querySelector(".editor")) {
    //without space between ".popup-circle.detail-ellipse" to select exactly this element
    //'.popup-circle .detail-ellipse' would select the 2nd one as a child of the 1st
    let detailEllipse = document.querySelector(".popup-circle.detail-ellipse");
    detailEllipse.style.backgroundColor = userColors[color];
  }
}

/**
 * Displays a mobile popup by appending it to the body and making it visible.
 * Resolves the promise immediately after displaying the popup. 
 * @returns {Promise<void>} A promise that resolves once the popup is displayed.
 */
function mobilePopup() {
  return new Promise((resolve) => {
    let popupHTML = popupBack();
    document.body.innerHTML += popupHTML;
    let popupBg = document.getElementById("popupBackground");
    popupBg.style.display = "block";
    setTimeout(() => {
      resolve();
    }, 0);
  });
}

/**
 * Displays an editing popup for the desktop view. Initializes the popup background
 * and sets its visibility. Resolves immediately after the popup is set to be displayed.
 *
 * @returns {Promise} A promise that resolves when the popup is displayed.
 */
function deskEditPopup() {
  return new Promise((resolve) => {
    //get popupBackground
    let popupHTML = popupBack();
    //set Background in popupBox in mainFrame
    document.getElementById("popupBox").innerHTML += popupHTML;
    let popupBg = document.getElementById("popupBackground");
    popupBg.style.display = "block";
    setTimeout(() => {
      resolve();
    }, 0);
  });
}

/**
 * Displays a popup to create new contact for the desktop view. Initializes the popup background
 * and sets its visibility. Resolves immediately after the popup is set to be displayed.
 *
 * @returns {Promise} A promise that resolves when the popup is displayed.
 */
function deskAddPopup() {
  return new Promise((resolve) => {
    let popupHTML = popupBack();
    document.getElementById("popupBox").innerHTML += popupHTML;
    let popupBg = document.getElementById("popupBackground");
    popupBg.style.display = "block";
    setTimeout(() => {
      resolve();
    }, 0);
  });
}

/**
 * removing colorpicker if visible and closes the Popup
 */
function closePopup() {
  let colorPicker = document.getElementById("colorPicker");
  let popBg = document.getElementById("popupBackground");
  if (colorPicker) {
    colorPicker.remove();
  }
  popBg.remove();
  //document.getElementById("popupBackground").style.display = "none";
}