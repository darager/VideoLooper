const numberExp = /(\d+\.\d+|\d+)/g;

document.getElementById("resetSettings").addEventListener("click", loadValues);
document.getElementById("saveSettings").addEventListener("click", saveSettings);

var speedValuesInput = document.getElementById("speedValues");
var moveVideoBySelector = document.getElementById("moveVideoBy");
var changeSpeedBySelector = document.getElementById("changeSpeedBy");
var preferedSpeedSelector = document.getElementById("preferedSpeed");

speedValuesInput.addEventListener("blur", ensureProperValues);
moveVideoBySelector.addEventListener("blur", ensureProperValues);
changeSpeedBySelector.addEventListener("blur", ensureProperValues);
preferedSpeedSelector.addEventListener("blur", ensureProperValues);

loadValues();

function loadValues() {
  getValues((values) => {
    speedValuesInput.value = values.speedValues;
    moveVideoBySelector.value = values.moveVideoBy;
    changeSpeedBySelector.value = values.changeSpeedBy;
    preferedSpeedSelector.value = values.preferedSpeed;
  });
}

function saveSettings() {
  ensureProperValues();
  storeValue({ speedValues: parseSpeedValues(speedValuesInput.value) });
  storeValue({ moveVideoBy: Number(moveVideoBySelector.value) });
  storeValue({ changeSpeedBy: Number(changeSpeedBySelector.value) });
  storeValue({ preferedSpeed: Number(preferedSpeedSelector.value) });
  showFeedback();
}

function showFeedback() {
  var p = document.createElement("h3");
  p.textContent = "Saved";

  var div = document.getElementById("buttons");
  div.appendChild(p);

  setTimeout(() => div.removeChild(p), 500);
}

function ensureProperValues() {
  const min = 0.1;
  const max = 5;
  moveVideoBySelector.value = constrain(moveVideoBySelector.value, min, null);
  changeSpeedBySelector.value = constrain(
    changeSpeedBySelector.value,
    min,
    null
  );
  preferedSpeedSelector.value = constrain(
    preferedSpeedSelector.value,
    min,
    max
  );
  speedValuesInput.value = constrainSpeedValues(
    speedValuesInput.value,
    min,
    max
  );
}

function constrain(value, min, max) {
  if (min != null && value < min) value = min;
  if (max != null && value > max) value = max;
  return Number(value);
}

function constrainSpeedValues(values, min, max) {
  let parsedValues = parseSpeedValues(values);
  let constrainedValues = parsedValues.map((v) => constrain(v, min, max));
  let uniqueValues = [...new Set(constrainedValues)];
  let sorted = uniqueValues.sort();
  return sorted.join(",");
}

function parseSpeedValues(string) {
  var values = [];
  let matches = [...string.matchAll(numberExp)];
  for (match of matches) {
    let value = match[0];
    values.push(Number(value));
  }
  return values;
}

function storeValue(kvPair) {
  chrome.storage.local.set(kvPair);
}

function getValues(callback) {
  let keys = ["moveVideoBy", "speedValues", "changeSpeedBy", "preferedSpeed"];
  chrome.storage.local.get(keys, (result) => {
    callback(result);
  });
}