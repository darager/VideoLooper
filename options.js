loadValues();

document.getElementById("resetSettings").addEventListener("click", loadValues);
document.getElementById("saveSettings").addEventListener("click", saveSettings);

var speedValuesInput = document.getElementById("speedValues");
var moveVideoBySelector = document.getElementById("moveVideoBy");
var changeSpeedBySelector = document.getElementById("changeSpeedBy");
var preferedSpeedSelector = document.getElementById("preferedSpeed");

function loadValues() {
    console.log('getting values');
    getValue("speedValues", (v) => speedValuesInput.value = v);
    getValue("moveVideoBy", (v) => moveVideoBySelector.value = v);
    getValue("changeSpeedBy", (v) => changeSpeedBySelector.value = v);
    getValue("preferedSpeed", (v) => preferedSpeedSelector.value = v);
}

function ensureProperValues() {
}

function saveSettings() {
  ensureProperValues();
  storeValue({"speedValues": speedValuesInput.value});
  storeValue({"moveVideoBy": moveVideoBySelector.value});
  storeValue({"changeSpeedBy": changeSpeedBySelector.value});
  storeValue({"preferedSpeed": preferedSpeedSelector.value});
}

// "saveSettings"

function storeValue(kvPair) {
  chrome.storage.local.set(kvPair);
}
function getValue(key, f) {
  chrome.storage.local.get(key, (result) => {
    var value = result[key];
    f(value);
  });
}
