chrome.runtime.onInstalled.addListener(setDefaultValues);

function setDefaultValues() {
  storeValue({"moveVideoBy": 5});
  storeValue({"speedValues": [0.2, 0.5, 1]});
  storeValue({"changeSpeedBy": 0.1});
  storeValue({"preferedSpeed": 2.0});
}

function storeValue(kvPair) {
  chrome.storage.local.set(kvPair);
}

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {cmd: command})
  });
});

