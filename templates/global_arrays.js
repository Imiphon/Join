//this array stores all contact informations
let users = [];

let contactArray = [
{
  name: "Anton",
  lastName: "Anfang",
  mail: "anton@mail.com",
  phone: "49179111",
  initials: "AA",
  color: "var(--user-orange)",
},
{
  name: "Ali",
  lastName: "Berg",
  mail: "ali@mail.com",
  phone: "49176000",
  initials: "AB",
  color: "var(--user-blue)",
},
{
  name: "Berta",
  lastName: "Anfang",
  mail: "berta@mail.com",
  phone: "49176000",
  initials: "BA",
  color: "var(--user-yellow)",
},
{
  name: "Bert",
  lastName: "Berg",
  mail: "bert@mail.com",
  phone: "49176000",
  initials: "BB",
  color: "var(--user-lila)",
},
{
  name: "Cesar",
  lastName: "Anfang",
  mail: "cesar@mail.com",
  phone: "49176000",
  initials: "CA",
  color: "var(--user-red)",
},
{
  name: "Dora",
  lastName: "Berg",
  mail: "dora@mail.com",
  phone: "49176000",
  initials: "DB",
  color: "var(--user-rose)",
},
{
  name: "Emil",
  lastName: "Anfang",
  mail: "emil@mail.com",
  phone: "49176000",
  initials: "EA",
  color: "var(--user-turquoise)",
},
{
  name: "Emil",
  lastName: "Berg",
  mail: "emil@mail.com",
  phone: "49176000",
  initials: "EB",
  color: "var(--user-green)",
},
{
  name: "Fred",
  lastName: "Anfang",
  mail: "fred@mail.com",
  phone: "49176000",
  initials: "EA",
  color: "var(--user-orange)",
}
  
];

let initialGroups = [];
let addedTasks = [
  {
    toDo: [
      
    ],
    inProgress: [
      

      
    ],
    awaitFeedback: [
     
        
    ],
  },
];

/*
IT'S ALL COPIED AND ADDAD TO ADD_TASK.JS

async function saveTasks() {
  await setItem("storedTasks", JSON.stringify(addedTasks));
}

async function loadTasks() {
  try {
    const loadedTasks = await getItem("storedTasks");
    if (loadedTasks) {
      addedTasks = JSON.parse(loadedTasks);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getContactsFromServerForAddTask() {
  try {
    contactArray = JSON.parse(await getItem("contacts"));
  } catch (e) {
    console.info("could not find contacts");
  }

}
*/
 
//=============================================
// COLORS
//=============================================

let userColors = {
  grey: "var(--user-grey)",
  orange: "var(--user-orange)",
  lila: "var(--user-lila)",
  blue: "var(--user-blue)",
  rose: "var(--user-rose)",
  yellow: "var(--user-yellow)",
  green: "var(--user-green)",
  red: "var(--user-red)",
  turquoise: "var(--user-turquoise)",
};
