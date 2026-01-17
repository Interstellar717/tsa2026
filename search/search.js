const url = new URLSearchParams(window.location.search);
console.log(url);
const q = url.get("q");

if (!q) {
    window.location.href = "/tsa2026/browse/"
}