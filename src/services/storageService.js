
function store(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function load(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}
export const storageService = {
    store,
    load
}
