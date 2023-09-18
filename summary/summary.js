document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname;

    

    if (currentPage.includes("summary")) {
        displayAddedTasksArr();

        if (window.innerWidth < 1024) {
            displayWelcomeMsg();
            checkStrValueQueryParam(); 
        }
        
        if (window.innerWidth >= 1024) {
            displayWelcomeMsgDesktop();
        }

    }
    
    if (currentPage.includes("templates/privacy_policy.html")) {
        let footerPolicyAnchor = document.querySelector(".footerPolicyAnchor");

        console.log("policy works", footerPolicyAnchor);
    }


  });


function changeBackgroundColorfooterPolicyAnchor() {
    let footerPolicyAnchor = document.querySelector(".footerPolicyAnchor");

    console.log("change changeBackgroundColorfooterPolicyAnchor()", footerPolicyAnchor);
}  

function displayAddedTasksArr() {
    let taskInBoardDiv = document.querySelector("#taskInBoardDiv");
    let tasksToDoDivNr = document.querySelector(".tasksToDoDivNr");
    let taskInProgressDiv = document.querySelector("#taskInProgressDiv");
    let taskAwaitingFeedback = document.querySelector("#taskAwaitingFeedback");
    taskInBoardDiv.innerHTML = addedTasks.length;
    taskInProgressDiv.innerHTML = addedTasks[0]['inProgress'].length;
    taskAwaitingFeedback.innerHTML = addedTasks[0]['awaitFeedback'].length;
    tasksToDoDivNr.innerHTML = addedTasks[0]['toDo'].length;
} 


function checkTrue(obj) {
    return Object.entries(obj).filter(state => state[1])[0][0];
 }
 
 // ********************************************************************************
 // ******************* checks the windows width ***********************************
 // ********************************************************************************
 function handleWindowResize() {
     var windowWidth = window.innerWidth;
     if (windowWidth >= 1024) {
       return true;
     }
   }
   
 window.addEventListener("resize", handleWindowResize);
   
 // ********************************************************************************
 // ********************************************************************************
 // ********************************************************************************
 
 
 // ********************************************************************************
 // ****************************** header Slidemenu ********************************
 // ********************************************************************************
 let displayed = false;
 function showSubmenuMobile() {
       let submenuMobile = document.getElementById("submenuMobile");
       console.log(submenuMobile);
       if (displayed) {
             submenuMobile.style.right = "-200px";
       } else {
             submenuMobile.style.right = "24px";
       }
       setTimeout(function() {
        document.addEventListener('click', closeOnOutsideClick);
    }, 0);

       displayed = !displayed;       
 }

 function closeOnOutsideClick(event) {
    let submenuMobile = document.getElementById("submenuMobile");
    
    if (!submenuMobile.contains(event.target) && event.target !== submenuMobile) {
        submenuMobile.style.right = "-200px";
        displayed = false;
        
        document.removeEventListener('click', closeOnOutsideClick);
    }
}
 // ********************************************************************************
 // ********************************************************************************
 // ********************************************************************************
 
 
 // ********************************************************************************
 // ********************* navigates to listed pages ********************************
 // ********************************************************************************
 function navigateToPage(buttonName) {
     switch (buttonName) {
         case 'summary':
             window.location.href = '../summary/summary.html';
             break;
         case 'add':
             window.location.href = '../add_task/add_task.html';
             break;
         case 'board':
             window.location.href = '../board/board.html';
             break;
         case 'contacts':
             window.location.href = '../contacts/contact_list.html';
             break;
         case 'help':
             window.location.href = '../templates/help.html';
             break;
         case 'legal':
             window.location.href = '../templates/imprint.html';
             break;
         case 'policy':
             window.location.href = '../templates/privacy_policy.html';
             break;
         case 'login':
             window.location = '../index.html';
             break;                    
         default:
             break;
     }
 }
 // ********************************************************************************
 // ********************************************************************************
 // ********************************************************************************
 
 
 
 // ********************************************************************************
 // This logic changes footer icon btns when clicked & sets summary as default content
 // ********************************************************************************
 function toggleButton(buttonName) {
     let buttonStates = {
         summary: false,
         add: false,
         contacts: false,
         board: false
     };
     let btnFooterMenuDesktopVersion = buttonName
     if (!handleWindowResize()) {
         
         let newBtnState = Object.entries(buttonStates)
         for (let btn of newBtnState) {
             if (btn[0] !== buttonName) {
                 let img = document.getElementById(`img${btn[0].charAt(0).toUpperCase() + btn[0].slice(1)}FooterMenu`);
                 img.src = `../assets/img/${btn[0]}_button_default.png`;
                 buttonStates[btn[0]] = false;
             }
         }
  
         let imgFooterMenu = document.getElementById(`img${buttonName.charAt(0).toUpperCase() + buttonName.slice(1)}FooterMenu`);
         
         if (!buttonStates[buttonName]) {
             imgFooterMenu.src = `../assets/img/${buttonName}_button_clicked.png`;
             navigateToPage(buttonName);
         } else {
             imgFooterMenu.src = `../assets/img/${buttonName}_button_default.png`;
         }
     } else {
         if (!buttonStates[buttonName]) {
             navigateToPage(buttonName);
         }
     }
     buttonStates[buttonName] = !buttonStates[buttonName];
     localStorage.setItem("allBtnState", JSON.stringify(buttonStates));
 }
 
 
 function updateBtnStyle(buttonName) {
     if (!handleWindowResize()) {
         switch (buttonName) {
             case 'summary':
                 document.getElementById("imgSummaryFooterMenu").src =  `../assets/img/${buttonName}_button_clicked.png`;
                 break;
             case 'add':
                 document.getElementById("imgAddFooterMenu").src = `../assets/img/${buttonName}_button_clicked.png`;
                 break;
             case 'board':
                 document.getElementById("imgBoardFooterMenu").src = `../assets/img/${buttonName}_button_clicked.png`;
                 break;
             case 'contacts':
                 document.getElementById("imgContactsFooterMenu").src = `../assets/img/${buttonName}_button_clicked.png`;
                 break;    
             default:
                 break;
         } 
     } else {
         switch (buttonName) {
             case 'summary':
                 document.getElementById(`btn_${buttonName}_FooterMenuDesktopVersion`).classList.add("btnActiveFooterMenuDesktopVersion");
                 break;
             default:
                 break;
         } 
     }
 }
 // ********************************************************************************
 // ********************************************************************************
 // ********************************************************************************
 

 
 // ***************** Welcome Msg based on the day time ****************************
 // ********************************************************************************
 async function displayWelcomeMsg() {
 const date = new Date();
 const currentHour = date.getHours();
 let welcomeMessage;
 
 if (currentHour < 12){
     welcomeMessage = "Good Morning";
     icon = "coffee";
 }
 else if (currentHour < 20){
     welcomeMessage = 'Good afternoon!';
     icon = "sun-o";
 }
 else if (currentHour < 24){
     welcomeMessage = "Good evening"
     icon = "moon-o";
 }
 else {
     welcomeMessage = "Welcome";
 }
 document.getElementById("welcomeText").innerHTML = welcomeMessage;
 document.getElementById("welcomeTextuserName").innerHTML = await checkStrValueQueryParam();
 
 }
 // ********************************************************************************
 // ********************************************************************************
 
 
 async function displayWelcomeMsgDesktop() {
     const date = new Date();
     const currentHour = date.getHours();
     let welcomeMessage;
 
     if (currentHour < 12){
         welcomeMessage = "Good Morning";
         icon = "coffee";
     }
     else if (currentHour < 20){
         welcomeMessage = 'Good afternoon';
         icon = "sun-o";
     }
     else if (currentHour < 24){
         welcomeMessage = "Good evening"
         icon = "moon-o";
     }
     else {
         welcomeMessage = "Welcome";
     }
     document.getElementById("welcomeText").innerHTML = welcomeMessage + `, `;
     document.getElementById("welcomeTextuserName").innerHTML = await checkStrValueQueryParamDesktop();
 }
 
 // ***************** Welcome Msg based on the day time ****************************
 // ********************************************************************************
 function welcomeMsgAnimation() {
     const welcomeMsgDiv = document.getElementById('welcomeMsgDiv');
     const summaryWrapper = document.querySelector('.summaryWrapper');
     setTimeout( function toggleAnimation() {
         welcomeMsgDiv.style.marginBottom = '-45vh';
         summaryWrapper.style.transform = 'translateY(0)';
         setTimeout( () => {
             welcomeMsgDiv.style.opacity = "0"; 
         }, 700)
         setTimeout( () => {
             welcomeMsgDiv.style.display = "none";
         }, 1000)
     }, 2000) 
 }
 // ********************************************************************************
 // ********************************************************************************
 
 
 // ***************** Welcome Msg based on the day time ****************************
 // ********************************************************************************
 function removeWelcomeMsgAnimation() {
     const welcomeMsgDiv = document.getElementById('welcomeMsgDiv');
     const summaryWrapper = document.querySelector('.summaryWrapper');
     welcomeMsgDiv.style.display = "none";
     welcomeMsgDiv.style.marginBottom = '0vh';
     summaryWrapper.style.transform = 'translateY(0)';
 }
 
 // ********************************************************************************
 // ********************************************************************************
 
 
 // ***************** Welcome Msg based on the day time ****************************
 // ********************************************************************************
   async function checkStrValueQueryParam() {
     const urlParams = new URLSearchParams(window.location.search);
     const myParam = urlParams.get('id');
     if (myParam) {
         welcomeMsgAnimation();
         return await findUserId(myParam);
     } else {
         removeWelcomeMsgAnimation();
     }
   }
   // ********************************************************************************
   // ********************************************************************************
 
   async function checkStrValueQueryParamDesktop() {
     const urlParams = new URLSearchParams(window.location.search);
     const myParam = urlParams.get('id');
     if (myParam) {
         return await findUserId(myParam);
     } else {
         return " dear guest"
     }
   }  
 
   
 async function findUserId(userId) {
     await loadUsers();
     return users[userId]['name'];
 }
 
 
   async function loadUsers() {
     try {
       users = JSON.parse(await getItem("users"));
     } catch (e) {
       console.error("Loading error:", e);
     }
   }