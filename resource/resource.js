const url = new URLSearchParams(window.location.search);
console.log(url);
const id = url.get("id");
const random = url.get("random");



if (parseInt(id) > -1) {
    getPageHTML(id);
} else if (random != undefined) {
    getPageHTML(Math.floor(Math.random() * 0));
}



async function getPageHTML(id) {
    id = id.toString().padStart(6, 0);
    var x = await fetch("/resource/blank.html");
    var json = await fetch("/resource/resources.json");
    if (!x.ok) return false;
    if (!json.ok) return false;
    x = await x.text();
    json = await json.json();
    qs("#resource-frame").innerHTML = x;
    document.title = json[parseInt(id)].name;
    qs("#resource-frame #RESOURCE-NAME").textContent = json[parseInt(id)].name;
    qs("#resource-frame #PERSON-NAME").textContent = json[parseInt(id)].person.name;
    qs("#resource-frame #PERSON-IMG").src = json[parseInt(id)].person.img;
    qs("#resource-frame #RESOURCE-DESCRIPTION").textContent = json[parseInt(id)].description;
    qs("#resource-frame #RESOURCE-IMAGE").src = json[parseInt(id)].image || "/img/placeholder.jpg";
}