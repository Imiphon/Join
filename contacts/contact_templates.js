
//============================================================
//  HTML TEMPLATES
//============================================================

/**
 * Constructs and returns the main frame HTML string. This frame includes
 * an add button, name group, popup box, and a success info message.
 *
 * @returns {string} The HTML string representing the main frame.
 */
function showMainFrame() {
    return `
  <div class="main-frame" id="mainFrame">
    <div class="group-frame" id="groupFrame">        
      <div class="add-btn-frame">
        <button class="add-btn" id="addBtn" onclick="widthForAdd();">
          <img src="../assets/img/person_add.png" alt="">
          <span id="addBtnTxt">Create a contact</span>
        </button>      
      </div>
      <div class="name-group" id="nameGroup">
      </div>
    </div>
  
    <button class="add-mob-btn" id="addBtn" onclick="widthForAdd();">
      <img src="../assets/img/person_add.png" alt="">
    </button>      
      
    <div class="popup-box" id="popupBox">
    </div>
    <div class="info-box" id="infoBox">
    </div>
    <div id="success-info">Contact successfully created</div>
  </div>
      `;
  }
  
  /**
   * Constructs and returns the HTML string for a name group based on the given initial.
   * The returned structure contains a letter box displaying the initial and a line box.
   *
   * @param {string} initial - The initial letter for the name group.
   * @returns {string} The HTML string representing the name group.
   */
  function GroupName(initial) {
    return `
      <div class="letter-box">
          <span class="letterBox">${initial}</span>
      </div>
      <div class="line-box">
          <div class="line"> </div>
      </div>
  `;
  }
  
  /**
   * returns the HTML content for displaying the data of persons
   * @param {string} person 
   * @param {int} i 
   * @returns 
   */
  function showPersonDatas(person, i) {
    return `
    <div class="name-frame">
        <div class="name-box" onclick="showInfo(${i})" id="${i}">
            <div class="side-circle initials" style="background-color: ${person.color};">
                ${person.initials}
            </div>
            <div class="name-mail-frame">
                <div class="full-name">
                    ${person.name} ${person.lastName}
                </div>
                <div class="mail">
                    ${person.mail}
                </div>
            </div>
        </div>
    </div>
    `;
  }
  
  /**
   * Constructs and returns the HTML content for displaying detailed information
   * of a given person. The function renders the person's name, initials, email, and phone
   * along with options to edit or delete the contact. Additional UI elements like a drawer 
   * with edit and delete options are also included.
   *
   * @param {Object} person - The object representing the person's data. The object should have
   * properties: name, lastName, mail, phone, initials, and color.
   * @param {int} indexNr - The index number of the person in the contactArray or a similar array.
   * @returns {string} The HTML content representing the detailed information of the specified person.
   */
  function showInfoText(person, indexNr) {
    return `
          <div class="detail-frame" id="detailFrame">
              <div class="detail-top-head">
                  <div>Contact Informations</div>
                  <button class="close-info" id="closeInfo" onclick="closeInfo()"><img class="arr-left" src="../assets/img/arrow-left-line.svg" alt="back"></button>   
              </div>
              <div class="detail-name-box">
                  <div class="detail-ellipse" style="background-color: ${person.color}">
                      ${person.initials}
                  </div>
                  
                      <div class="column">                      
                          <div class="detail-name">
                          ${person.name} ${person.lastName}
                          </div>
                          <div class="more-row" id="moreRow">
                              <div class="more-row-box" onclick="widthForEdit(${indexNr})">
                                  <img src="../assets/img/edit.png" alt="Edit">
                                  <span>Edit</span>
                              </div>
                              <div class="more-row-box" onclick="deleteContact(${indexNr})">
                                  <img src="../assets/img/delete.png" alt="Delete">
                                  <span>Delete</span>
                              </div>
                          </div>
                      </div>    
              </div>
              <div class="adr-box">
              <div class="desk-header">Contact Informations</div>
                  <div class="detail-description bold">
                      Email
                  </div>
                  <div class="mail send-mail">
                  <a href="mailto:${person.mail}">${person.mail}</a>
                  </div>
                  <div class="detail-description bold">
                      Phone
                  </div>
                  <div class="info-text tel">
                  <a href="tel:${person.phone}">${person.phone}</a>
                  </div>
              </div>
          </div>
          <button class="more-btn" id="moreBtn" onclick="toggleDrawer()">
              <img src="../assets/img/more_btn.svg" alt="">
          </button>
          <div id="drawer">
            <div class="drawer-item" onclick="widthForEdit(${indexNr})">
              <img src="../assets/img/edit.png" alt="Edit">
              <span>Edit</span>
            </div>
            <div class="drawer-item" onclick="deleteContact(${indexNr})">
              <img src="../assets/img/delete.png" alt="Delete">
              <span>Delete</span>
            </div>
          </div>
      `;
  }
  
  /**
   * Constructs and returns the HTML content for a generic popup background.
   * This function creates a popup layout with separate sections for different
   * content, namely general content, add content, and edit content.
   *
   * @returns {string} The HTML content representing the structure of the popup background.
   */
  function popupBack() {
    return `
      <div class="popup-background" id="popupBackground">
          <div class="popup" id="popup">  
              <div class="popup-content" id="popContent">
              </div>          
              <div class="pop-add-content" id="popupRight">
              </div>
              <div class="pop-edit-content" id="popupLeft">
              </div>
          </div>
      </div>
      `;
  }
  
  /**
   * Constructs and returns the HTML content for the "Add Contact" popup form.
   * This function creates a form that allows the user to input details for a new contact,
   * including name, email, and phone number. The form also includes options for choosing 
   * a contact color and avatar, as well as actions for creating the contact or canceling the process.
   *
   * @returns {string} The HTML content representing the "Add Contact" form layout.
   */
  function showAddContact() {  
    return `
      <div class="pop-top" id="popTop">
          <a onclick="closePopup()"><img src="../assets/img/close.png" alt="close"></a>
          <img class="pop-logo" src="../assets/img/logo_mobile_white.svg">
          <span class="pop-header">Add contact</span>
          <span class="pop-subtitle">Tasks are better with a team!</span>
      </div>
      <div>
          <img class="popup-circle no-border detail-ellipse" src="../assets/img/person_initial.png" alt="person_initial">
      </div>
      <div class="pop-bottom">
          <div class="form-frame">
              <form id="userForm" class="user-form" onsubmit="createContact(); return false;">
                  <div class="contact-frame">
                  <input 
                  class="contact-input" 
                  type="text" 
                  id="fullName" 
                  placeholder="Name Nachname" 
                  required 
                  pattern="[a-zA-ZäöüÄÖÜß]{2,15} [a-zA-ZäöüÄÖÜß]{2,15}" 
                  title="Bitte geben Sie einen Vor- und Nachnamen ein.">
              
                      <div class="color-img-box">
                          <div class="color-frame">
                              <div id="colorBox" class="color-box" onclick="openColorPicker()">
                                  <div id="colorPicker" class="color-picker" style="display: none;">
                                      <!-- colors -->
                                  </div>
                              </div>
                          </div>
                          <img src="../assets/img/person_small.png" alt="name">
                      </div>
                  </div>
                  <div class="contact-frame">
                      <input class="contact-input" type="email" required id="email" placeholder="Email">
                      <img src="../assets/img/mail_small.png" alt="name">
                  </div>
                  <div class="contact-frame tel-box">
                    <input class="contact-input" required type="tel" id="phone" placeholder="Telefon"
                    pattern="^(\\+?\\d{9,15}|(\\+?|\\d{0,4})?\\s?\\d{3,4}\\s?\\d{3,8}|(\\+?|\\d{0,4})?\\s?\\d{3,5}\\s?\\d{7,8})$"
                    title="9-15 Ziffern, opt. mit Leerzeichen oder + (+12345678901, 0123 4561234, 1 123 123 1234)">
                    <img src="../assets/img/call_small.png" alt="phone">         
                  </div>
                  <div class="btn-box">
                  <button class="white-btn" onclick="closePopup()">
                      Cancel
                      <img src="../assets/img/close_dark-grey.png">
                  </button>
                  <button id="createBtn" type="submit" class="blue-btn">
                      Create Contact
                      <img src="../assets/img/check_small.png">
                  </button>
              </div>
              </form>
          </div>
      </div>
          `;
  }
  
  /**
   * Constructs and returns the HTML content for the "Edit Contact" popup form.
   * This function creates a form that allows the user to edit the details of an existing contact,
   * including name, email, phone number, and contact color. The form also includes options 
   * for deleting the contact or saving the changes.
   *
   * @param {int} index - The index of the contact in the contactArray to be edited.
   * @returns {string} The HTML content representing the "Edit Contact" form layout.
   */
  function showEditContact(index) {
    let person = contactArray[index];
    let indexNr = index;
    return /*html */`
          <div class="pop-top" id="popTop">
          <a onclick="closePopup()"><img src="../assets/img/close.png" alt="close"></a>
          <img class="pop-logo" src="../assets/img/logo_mobile_white.svg">
          <span class="pop-header">Edit contact</span>
          <span class="pop-subtitle">Tasks are better with a team!</span>
      </div>
      <div>
          <div class="popup-circle detail-ellipse" style="background-color: ${person.color}">
              ${person.initials}
          </div>
      </div>
      <div class="pop-bottom">
      <div class="form-frame">
          <form id="userForm" class="user-form" onsubmit="editContactInArray(${indexNr}); return false;">            
                  <div class="contact-frame">
                      <input class="contact-input" type="text" id="fullName" onclick="keepString('fullName')"
                          placeholder="${person.name} ${person.lastName}" required pattern="[a-zA-ZäöüÄÖÜß]{2,15} [a-zA-ZäöüÄÖÜß]{2,15}"
                          title="Bitte geben Sie einen Vor- und Nachnamen ein.">
  
                          <div class="color-img-box">
                          <div class="color-frame">
                              <div id="colorBox" class="color-box editor" onclick="openColorPicker()" style="background-color: ${person.color}">
                                  <div id="colorPicker" class="color-picker" style="display: none;">
                                      <!-- colors -->
                                  </div>
                              </div>
                          </div>
                          <img src="../assets/img/person_small.png" alt="name">
                      </div>
                  </div>
                  <div class="contact-frame">
                      <input class="contact-input" onclick="keepString('email')" required type="email" id="email" placeholder="${person.mail}">
                      <img src="../assets/img/mail_small.png" alt="name">
                  </div>
                  <div class="contact-frame">
                  <input class="contact-input" onclick="keepString('phone')" required type="tel" id="phone" placeholder="${person.phone}"
                  pattern="^(\\+?\\d{9,15}|(\\+?|\\d{0,4})?\\s?\\d{3,4}\\s?\\d{3,8}|(\\+?|\\d{0,4})?\\s?\\d{3,5}\\s?\\d{7,8})$"
                  title="9-15 Ziffern, opt. mit Leerzeichen oder + (+12345678901, 0123 4561234, 1 123 123 1234)">
           <img src="../assets/img/call_small.png" alt="phone">         
                  </div>
              
              <div class="btn-box">
                  <button class="white-btn" onclick="deleteInEditor(${indexNr})">
                      Delete
                  </button>
                  <button class="blue-btn" type="submit">
                      Save
                      <img src="../assets/img/check_small.png">
                  </button>
              </div>
          </form>
          </div>
      </div>
      `;
  }
  