//this array comes from server and has always to be updated
let contactArray = [
    {name:'Anton', lastName:'Anfang', mail:'anton@mail.com', tel:49179111, color:'--user-orange'},
    {name:'Ali', lastName:'Berg', mail:'ali@mail.com', tel:49176000, color:'--user-blue'},
    {name:'Berta', lastName:'Anfang', mail:'berta@mail.com', tel:49176000, color:'--user-yellow'},
    {name:'Bert', lastName:'Berg', mail:'bert@mail.com', tel:49176000, color:'--user-lila'},
    {name:'Cesar', lastName:'Anfang', mail:'cesar@mail.com', tel:49176000, color:'--user-red'},
    {name:'Dora', lastName:'Berg', mail:'dora@mail.com', tel:49176000, color:'--user-rose'},
    {name:'Emil', lastName:'Anfang', mail:'emil@mail.com', tel:49176000, color:'--user-turquoise'},
]

let initialGroups = [];


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