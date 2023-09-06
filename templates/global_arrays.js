//this array comes from server and has always to be updated

let contactArray = [
    {name:'Anton', lastName:'Anfang', mail:'anton@mail.com', phone:'49179111', initials:'AA', color:'var(--user-orange)'},
    {name:'Ali', lastName:'Berg', mail:'ali@mail.com', phone:'49176000', initials:'AB', color:'var(--user-blue)'},
    {name:'Berta', lastName:'Anfang', mail:'berta@mail.com', phone:'49176000', initials:'BA', color:'var(--user-yellow)'},
    {name:'Bert', lastName:'Berg', mail:'bert@mail.com', phone:'49176000', initials:'BB', color:'var(--user-lila)'},
    {name:'Cesar', lastName:'Anfang', mail:'cesar@mail.com', phone:'49176000', initials:'CA', color:'var(--user-red)'},
    {name:'Dora', lastName:'Berg', mail:'dora@mail.com', phone:'49176000', initials:'DB', color:'var(--user-rose)'},
    {name:'Emil', lastName:'Anfang', mail:'emil@mail.com', phone:'49176000', initials:'EA', color:'var(--user-turquoise)'},
    {name:'Emil', lastName:'Berg', mail:'emil@mail.com', phone:'49176000', initials:'EB', color:'var(--user-green)'},
    {name:'Fred', lastName:'Anfang', mail:'fred@mail.com', phone:'49176000', initials:'EA', color:'var(--user-orange)'},
]

let initialGroups = [];

let tasksForSubtasks = [];

let addedTasks = [
    {
        'toDo':[],
        'inProgress':[],
        'awaitFeedBack':[]
    }
];


/*Remote Storage Implementierung*/
const STORAGE_TOKEN = 'F4LGRNFMG9GWI4STVSTG89MGMCVVVRZDK3KPVIVF';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = {key, value, token: STORAGE_TOKEN};
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

/**
 * ein Gedanke: wir schreiben hier eine fetch-Funktion, 
 * die alle auf dem server gespeicherten daten des Users herunterlädt, 
 * und in unseren globalen Arrays speichert. 
 * Wenn neue Informationen vom User hinzugefügt werden, 
 * und sich ein globales array in seiner Größe verändert, startet dieses
 * event eine Funktion, die den server updatet.
 * 
 * P.S. hier würde ich auch gerne ALLE globalen Arrays speichern.
 */