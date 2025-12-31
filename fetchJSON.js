var resourceJSON;
function filterResourcesByTag(tag) {
    if (!resourceJSON || !qs(".categories-container")) {
        setTimeout(() => { filterResourcesByTag(tag) }, 100);
        return false;
    }

    const display = document.getElementById('event-container');

    var html = `<div class="filtered-event">
                    <img src="" class="filev-img" alt="temporary image">
                    <div class="caption"><a href="">Temporary Text</a></div>
                </div>`;
    var parser = new DOMParser();
    const filtered_event = parser.parseFromString(html, "text/html").querySelector(".filtered-event");

    const matching = [];

    for (let resource of resourceJSON) {
        if (resource.tags.includes(tag) || !tag) {
            matching.push(resource);
        }
    }

    if (matching.length == 0) {
        display.innerHTML = "<h2>No resources found matching this tag.</h2>";
        return false;
    }

    display.innerHTML = "";
    for (let i = 0; i < matching.length; i++) {
        display.appendChild(filtered_event.cloneNode(true));
    }

    for (let i in matching) {
        display.querySelectorAll(".filtered-event .filev-img")[i].src = matching[i].image || "/img/placeholder.jpg";
        display.querySelectorAll(".filtered-event .caption a")[i].textContent = matching[i].name;
        display.querySelectorAll(".filtered-event .caption a")[i].href = "/resource/?id=" + i.toString().padStart(6, 0);
    }
}
(async () => {
    var json = await fetch("/resource/resources.json");
    if (!json.ok) return false;
    resourceJSON = await json.json();

    filterResourcesByTag();
})();