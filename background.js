chrome.management.onInstalled.addListener(setDefaultValues);

// TODO: only for testing!!
setDefaultValues();

function setDefaultValues() {
  console.log("setting default values!");
  storeValue({"moveVideoBy": 5});
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

