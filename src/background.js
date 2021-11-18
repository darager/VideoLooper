chrome.runtime.onInstalled.addListener(setDefaultValues);

function setDefaultValues() {
  storeValue({"moveVideoBy": 5});
  storeValue({"speedValues": [0.2, 0.5, 1]});
  storeValue({"changeSpeedBy": 0.1});
  storeValue({"preferedSpeed": 2.0});
  storeValue({"forceLastPlaybackRate": false});
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


// store extension id for sending messages from content-scripts
storeValue({"extensionId": chrome.runtime.id})

// required for storing last playbackrate (rememberPlaybackSpeed.js)
chrome.runtime.onMessage.addListener((request, sender, response) => {
  var cmd = { id: request.cmd, value: request.value };
  if(cmd.id == "storeValue") {
    var kvPair = {};
    kvPair[cmd.value.key] = cmd.value.value;

    console.log("store", kvPair);
    storeValue(kvPair);
  }
});
