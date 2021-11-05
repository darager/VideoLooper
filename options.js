const numberExp = /(\d+\.\d+|\d+)/g;

document.getElementById("resetSettings").addEventListener("click", loadValues);
document.getElementById("saveSettings").addEventListener("click", saveSettings);
document.getElementById("ensureProperValues").addEventListener("click", ensureProperValues);

var speedValuesInput = document.getElementById("speedValues");
var moveVideoBySelector = document.getElementById("moveVideoBy");
var changeSpeedBySelector = document.getElementById("changeSpeedBy");
var preferedSpeedSelector = document.getElementById("preferedSpeed");

loadValues();

function loadValues() {
    getValue("speedValues", (v) => speedValuesInput.value = v);
    getValue("moveVideoBy", (v) => moveVideoBySelector.value = v);
    getValue("changeSpeedBy", (v) => changeSpeedBySelector.value = v);
    getValue("preferedSpeed", (v) => preferedSpeedSelector.value = v);
}

function saveSettings() {
  ensureProperValues();
  storeValue({"speedValues": parseSpeedValues(speedValuesInput.value)});
  storeValue({"moveVideoBy": moveVideoBySelector.value});
  storeValue({"changeSpeedBy": changeSpeedBySelector.value});
  storeValue({"preferedSpeed": preferedSpeedSelector.value});
}

function ensureProperValues() {
  const min = 0.1;
  const max = 5;
  moveVideoBySelector.value = constrain(moveVideoBySelector.value, min, null);
  changeSpeedBySelector.value = constrain(changeSpeedBySelector.value, min, null);
  preferedSpeedSelector.value = constrain(preferedSpeedSelector.value, min, max);
  speedValuesInput.value = constrainSpeedValues(speedValuesInput.value, min, max);
}

function constrain(value, min, max) {
  if(min != null && value < min) value = min;
  if(max != null && value > max) value = max;
  return value;
}

function constrainSpeedValues(values, min, max) {
  let parsedValues = parseSpeedValues(values);
  let constrainedValues = parsedValues.map((v) => constrain(v, min, max));
  let uniqueValues = [...new Set(constrainedValues)];
  let sorted = uniqueValues.sort();
  return sorted.join(',');
}

function parseSpeedValues(string) {
  var values = [];
  let matches = [...string.matchAll(numberExp)];
  for (match of matches){
    let value = match[0];
    values.push(Number(value));
  }
  return values;
}

function storeValue(kvPair) {
  chrome.storage.local.set(kvPair);
}
function getValue(key, f) {
  chrome.storage.local.get(key, (result) => {
    var value = result[key];
    f(value);
  });
}
