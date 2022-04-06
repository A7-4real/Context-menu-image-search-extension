console.log("eventPage Loaded");

var contextMenuItem = {
  id: "RIS",
  title: "Disinformation in Image",
  contexts: ["image"],
};

chrome.contextMenus.create(contextMenuItem);
console.log("context item created");

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "RIS")
    console.log("Disinformation in Image context item clicked");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("Now sending message to content script...");
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "openSearchResult" },
      function (response) {
        console.log("searchResult overlay opened!");
      }
    );
  });
});
