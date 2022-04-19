console.log("eventPage Loaded");

// Defining our context menu with image as contexts
var contextMenuItem = {
  id: "RIS",
  title: "Disinformation in Image",
  contexts: ["image"],
};

// creating context menu with "Disinformation in Image" as title
chrome.contextMenus.create(contextMenuItem);
console.log("context item created");

// When user clicks a context menu we would check whether context menu id is
// same as "Disinformation in Image context menu" id
chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "RIS")
    console.log("Disinformation in Image context item clicked");

  // we would send message current and active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("Now sending message to content script...");
    // send message to content script
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "openSearchResult", data: clickData.srcUrl },
      function (response) {
        console.log("searchResult overlay opened!");
        console.log(response);
      }
    );
  });
});
