//this array stores all contact informations
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
  },
];

let initialGroups = [];
let addedTasks = [
  {
    toDo: [
      {
        title: "Kochwelt",
        description: "Build start page with recipe recommendation.",
        date: "2023-09-16",
        category: "kochen",
        priority: "medium",
        subtasks: ["schnell", "love", "was geehet"],
        progresWidth: 0,
        selectedContacts: ["AA", "KL", "be", "Da"],
      },

      {
        category: "design",
        date: "2023-09-24",
        description: "ddd",
        priority: "low",
        progressWidth: 0,
        selectedContacts: [("AA", "AB", "BA", "BB")],
        subTask: ["was"],
        title: "ddd",
      },
    ],
    inProgress: [],
    awaitFeedBack: [],
  },
];

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
