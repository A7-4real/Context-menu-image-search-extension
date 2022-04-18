console.log("content script loaded");

// iframe attributes
var body = document.getElementsByTagName("body")[0];
var iframe = document.createElement("iframe");
iframe.style.height = "100%";
iframe.style.width = "0px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
// temporary react app as iframe src
iframe.src = "http://localhost:3000/";
// console.log("iframe created", iframe.src);

// append iframe with 0 width
document.body.appendChild(iframe);
console.log("iframe appended to current page", iframe);

// change width of iframe to 400px
function toggle() {
  // predefined iframe width
  let iframeWidth = 370;

  // change width if toggle function is called and iframe Width is 0
  if (iframe.style.width == "0px") {
    // get current window width
    let currentWidth = window.innerWidth;
    let setWidth = currentWidth - iframeWidth;
    document.body.style.width = `${setWidth}px`;
    iframe.style.width = `${iframeWidth}px`;
  } else {
    document.body.style.width = `${currentWidth}px`;
    iframe.style.width = "0px";
  }
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action == "openSearchResult") {
    console.log("Message recieved", msg.action);
    toggle();
    console.log("toggled function called");
  }
  sendResponse(true);
});

// function adjustWidth() {
//     width = 0;
//     if (window.innerHeight) {
//         width = window.innerWidth;
//     } else if (document.documentElement && document.documentElement.clientHeight) {
//         width = document.documentElement.clientWidth;
//     } else if (document.body) {
//         width = document.body.clientWidth;
//     }

//     if (width < 1152) {
//         document.getElementsByTagName("body").style.width="650px";
//     }
//     if (width >= 1152) {
//         document.getElementsByTagName("body").style.width="775px";
//     }
// }
// window.onresize = function() {
//     adjustWidth();

// };
// window.onload = function() {
//     adjustWidth();
// };
