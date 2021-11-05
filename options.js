loadValues();

document.getElementById("resetSettings").addEventListener("click", loadValues);
document.getElementById("saveSettings").addEventListener("click", saveSettings);
document.getElementById("ensureProperValues").addEventListener("click", ensureProperValues);

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
  moveVideoBySelector.value = constrain(moveVideoBySelector.value, 0.1, null);
  preferedSpeedSelector.value = constrain(preferedSpeedSelector.value, 0.1, 5);
  changeSpeedBySelector.value = constrain(changeSpeedBySelector.value, 0.1, null);

  let values = parseSpeedValues(speedValuesInput.value);
  let constrainedValues = values.map((v) => constrain(v, 0.1, 5));
  let uniqueValues = [...new Set(constrainedValues)];
  let sorted = uniqueValues.sort();
  let valuesText = sorted.join(',');
  speedValuesInput.value = valuesText;
}

function constrain(value, min, max) {
  if(min != null && value < min) value = min;
  if(max != null && value > max) value = max;
  return value;
}

const regexp = /(\d+\.\d+|\d+)/g;
function parseSpeedValues(string) {
  var values = [];
  let matches = [...string.matchAll(regexp)];
  for (match of matches){
    let value = match[0];
    values.push(value);
  }
  return values;
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
