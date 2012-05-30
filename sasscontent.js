// © Copyright 2012 Carlos Quiroz. All rights reserved.
// All trademarks and service marks are the properties of their respective owners.
//
function getSassDebugInfo() {
    var sassDefinitions = {};
    var allSheets = document.styleSheets;
    for (var i = 0; i < allSheets.length; ++i) {
        var sheet = allSheets[i];
        var src = sheet.href;
        var rules = sheet.cssRules || sheet.rules;
        if (rules != null) {
            for (var i = 0; i < rules.length; i++) {
              if (rules[i].type == CSSRule.MEDIA_RULE && rules[i].media[0] === '-sass-debug-info') {
                    var regFileName = /font-family: '(.*)';/g;
                    var filename = regFileName.exec(rules[i].cssRules[0].style.cssText);
                    var regFileNum = /font-family: '(.*)';/g;
                    var filenum = regFileNum.exec(rules[i].cssRules[1].style.cssText);
                    i = i + 1;
                    var css = rules[i].selectorText;
                    sassDefinitions[css] = {filename: filename[1], linenum: filenum[1]};
              }
            }
        }
    }
    return sassDefinitions;
}

// This is a trick needed to register the listener only once
// otherwise we end up with multiple registrations if the developer tools
// are open and closed many times
if (typeof listener == 'undefined') {
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        sendResponse(getSassDebugInfo());
    });
}

var listener = true;

