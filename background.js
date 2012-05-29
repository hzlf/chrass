//
// © Copyright 2012 Carlos Quiroz. All rights reserved.
// All trademarks and service marks are the properties of their respective owners.
//
/**
 * Function called when the extension is installed for the first time
 */
function onInstall() {
    chrome.tabs.create({
        url: 'docs/readme.html'
    });
}

/**
 * Function called when the extension is updated
 */
function onUpdate() {
    chrome.tabs.create({
        url: 'docs/readme.html'
    });
}

/**
 * Finds out the version of the extension
 */
function getVersion() {
    var details = chrome.app.getDetails();
    return details.version;
}

/**
 * Runs to show when the extension is installed or updated
 */
if (chrome && chrome.extension) {
    // Check if the version has changed.
    var currVersion = getVersion();
    var prevVersion = localStorage['version']
    if (currVersion != prevVersion) {
        // Check if we just installed this extension.
        if (typeof prevVersion == 'undefined') {
            onInstall();
        } else {
            onUpdate();
        }
        localStorage['version'] = currVersion;
    }
}

// Install a request listener as the devtools page cannot see the actual DOM
// of the page
chrome.extension.onRequest.addListener(function(request, sender, callback) {
    var tabId = request.tabId;

    // Execute the script on the context of the inspected page
    chrome.tabs.executeScript(tabId, { file: "sasscontent.js" },
      function() {
          chrome.tabs.sendRequest(tabId, {},
          function(results) {
              callback(results);
          });
      });
});
