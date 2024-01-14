//this array stores all contact informations
let users = [];

let contactArray = [
  {
    name: "Anton",
    lastName: "Anfang",
    mail: "anton@mail.com",
    phone: "+1234567890",
    initials: "AA",
    color: "var(--user-orange)",
  },
  {
    name: "Ali",
    lastName: "Berg",
    mail: "ali@mail.com",
    phone: "1234 567890",
    initials: "AB",
    color: "var(--user-blue)",
  },
  {
    name: "Berta",
    lastName: "Anfang",
    mail: "berta@mail.com",
    phone: "+1234 567890",
    initials: "BA",
    color: "var(--user-yellow)",
  },
  {
    name: "Bert",
    lastName: "Berg",
    mail: "bert@mail.com",
    phone: "1 123 123 1234",
    initials: "BB",
    color: "var(--user-lila)",
  },
  {
    name: "Cesar",
    lastName: "Anfang",
    mail: "cesar@mail.com",
    phone: "1234 567890",
    initials: "CA",
    color: "var(--user-red)",
  },
  {
    name: "Dora",
    lastName: "Berg",
    mail: "dora@mail.com",
    phone: "+1234 567890",
    initials: "DB",
    color: "var(--user-rose)",
  },
  {
    name: "Emil",
    lastName: "Anfang",
    mail: "emil@mail.com",
    phone: "+1234567890",
    initials: "EA",
    color: "var(--user-turquoise)",
  },
  {
    name: "Emil",
    lastName: "Berg",
    mail: "emil@mail.com",
    phone: "00123456789",
    initials: "EB",
    color: "var(--user-green)",
  },
  {
    name: "Fred",
    lastName: "Anfang",
    mail: "fred@mail.com",
    phone: "001123456789",
    initials: "EA",
    color: "var(--user-orange)",
  }
];

let initialGroups = [];
let addedTasks = [

  {
    urgent: [],
    toDo: [],
    inProgress: [],
    awaitFeedback: [],
    done: [],
  },

];

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

