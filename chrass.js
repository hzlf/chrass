//
// © Copyright 2012 Carlos Quiroz. All rights reserved.
// All trademarks and service marks are the properties of their respective owners.
//
// This script is called when the devtools are opened
// We first try to detect if the inspected page contains a css file
// generated by Saas, and in that case a developer sidbar is opened
// Inspect the resources on the inspected window
chrome.devtools.inspectedWindow.getResources(setupSassSidebar);

/**
 * Called upon Developer Tools is opened with the list of the resources in the page
 * This function tries to determine if there are css files made using sass
 */
function setupSassSidebar(resources) {
    var cssResources = findCssResources(resources);
    findSassResources(cssResources);
}

/**
 * Finds what files are css on the resources list
 */
function findCssResources(resources) {
    var cssResources = [];
    for (var i = 0; i < resources.length; i++) {
        // We decide that the files ending with css are the ones assumed to be css
        // It could be better to actually parse the resource
        if (resources[i].url.search('\\.css') > 0) {
            cssResources.push(resources[i]);
        }
    }
    return cssResources;
}

/**
 * Read the css file content and try to find saas debugging information
 */
function findSassResources(cssResources) {
    var sassResources = [];
    var resourcesParsed = 0;
    for (var i = 0; i < cssResources.length; i++) {
        // Load each resources. The getContent call is asynchronous
        cssResources[i].getContent(function(content) {
            // Search for the marker of debug info
            if (content.search('-sass-debug-info') > 0) {
                sassResources.push(cssResources[i]);
            }

            resourcesParsed = resourcesParsed + 1;
            if (resourcesParsed === cssResources.length) {
                // Completed parsing of all css resources
                if (sassResources.length > 0) {
                    buildSidebar();
                }
            }
        });
    }
}

/**
 * Creates the sidebar
 */
function buildSidebar() {
    chrome.devtools.panels.elements.createSidebarPane("Saas", function(sidebar) {
        // on version 0.1 we display a static page indicating
        // sass has been found
        sidebar.setPage("saasfound.html");
    });
}

