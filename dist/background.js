/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.create({
    url: "index.html"
  });
});

/**
 * @param {Date} date -
 */
var createAlarm = function createAlarm(date, time, name) {
  var dateTime = new Date("".concat(date, "T").concat(time, ":00")).getTime();
  console.log(dateTime);
  chrome.alarms.create(name.split(" ").join("_"), {
    when: dateTime
  }, function () {});
};

/**
 * @param {string} alarm
 */

chrome.alarms.onAlarm.addListener(function (alarm) {
  createNotification(alarm.name.split("_").join(" "));
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Received message:", request);
  if (request.event === "sendDate") {
    createAlarm(request.date, request.time, request.reminder);
    sendResponse({
      status: "Notification triggered"
    });
  } else if (request.event === "removeDate") {
    chrome.alarms.clear(request.reminder.split(" ").join("_"));
    sendResponse({
      status: "Notification removed"
    });
  }
});

/**
 *
 * @param {String} message
 */

var createNotification = function createNotification(message) {
  chrome.notifications.create("Notification_".concat(message), {
    title: "Class Compass",
    message: message,
    type: "basic",
    iconUrl: "Logo1.png",
    priority: 2
  }, function () {
    console.log("Notification created");
  });
};
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY2hyb21lLmFjdGlvbi5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoKHRhYikgPT4ge1xuICBjaHJvbWUudGFicy5jcmVhdGUoe1xuICAgIHVybDogXCJpbmRleC5odG1sXCIsXG4gIH0pO1xufSk7XG5cbi8qKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC1cbiAqL1xuY29uc3QgY3JlYXRlQWxhcm0gPSAoZGF0ZSwgdGltZSwgbmFtZSkgPT4ge1xuICBjb25zdCBkYXRlVGltZSA9IG5ldyBEYXRlKGAke2RhdGV9VCR7dGltZX06MDBgKS5nZXRUaW1lKCk7XG4gIGNvbnNvbGUubG9nKGRhdGVUaW1lKTtcbiAgY2hyb21lLmFsYXJtcy5jcmVhdGUoXG4gICAgbmFtZS5zcGxpdChcIiBcIikuam9pbihcIl9cIiksXG4gICAge1xuICAgICAgd2hlbjogZGF0ZVRpbWUsXG4gICAgfSxcbiAgICAoKSA9PiB7fSxcbiAgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGFsYXJtXG4gKi9cblxuY2hyb21lLmFsYXJtcy5vbkFsYXJtLmFkZExpc3RlbmVyKChhbGFybSkgPT4ge1xuICBjcmVhdGVOb3RpZmljYXRpb24oYWxhcm0ubmFtZS5zcGxpdChcIl9cIikuam9pbihcIiBcIikpO1xufSk7XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgY29uc29sZS5sb2coXCJSZWNlaXZlZCBtZXNzYWdlOlwiLCByZXF1ZXN0KTtcblxuICBpZiAocmVxdWVzdC5ldmVudCA9PT0gXCJzZW5kRGF0ZVwiKSB7XG4gICAgY3JlYXRlQWxhcm0ocmVxdWVzdC5kYXRlLCByZXF1ZXN0LnRpbWUsIHJlcXVlc3QucmVtaW5kZXIpO1xuICAgIHNlbmRSZXNwb25zZSh7IHN0YXR1czogXCJOb3RpZmljYXRpb24gdHJpZ2dlcmVkXCIgfSk7XG4gIH0gZWxzZSBpZiAocmVxdWVzdC5ldmVudCA9PT0gXCJyZW1vdmVEYXRlXCIpIHtcbiAgICBjaHJvbWUuYWxhcm1zLmNsZWFyKHJlcXVlc3QucmVtaW5kZXIuc3BsaXQoXCIgXCIpLmpvaW4oXCJfXCIpKTtcbiAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6IFwiTm90aWZpY2F0aW9uIHJlbW92ZWRcIiB9KTtcbiAgfVxufSk7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gKi9cblxuY29uc3QgY3JlYXRlTm90aWZpY2F0aW9uID0gKG1lc3NhZ2UpID0+IHtcbiAgY2hyb21lLm5vdGlmaWNhdGlvbnMuY3JlYXRlKFxuICAgIGBOb3RpZmljYXRpb25fJHttZXNzYWdlfWAsXG4gICAge1xuICAgICAgdGl0bGU6IFwiQ2xhc3MgQ29tcGFzc1wiLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHR5cGU6IFwiYmFzaWNcIixcbiAgICAgIGljb25Vcmw6IFwiTG9nbzEucG5nXCIsXG4gICAgICBwcmlvcml0eTogMixcbiAgICB9LFxuICAgICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uIGNyZWF0ZWRcIik7XG4gICAgfSxcbiAgKTtcbn07XG4iXSwibmFtZXMiOlsiY2hyb21lIiwiYWN0aW9uIiwib25DbGlja2VkIiwiYWRkTGlzdGVuZXIiLCJ0YWIiLCJ0YWJzIiwiY3JlYXRlIiwidXJsIiwiY3JlYXRlQWxhcm0iLCJkYXRlIiwidGltZSIsIm5hbWUiLCJkYXRlVGltZSIsIkRhdGUiLCJjb25jYXQiLCJnZXRUaW1lIiwiY29uc29sZSIsImxvZyIsImFsYXJtcyIsInNwbGl0Iiwiam9pbiIsIndoZW4iLCJvbkFsYXJtIiwiYWxhcm0iLCJjcmVhdGVOb3RpZmljYXRpb24iLCJydW50aW1lIiwib25NZXNzYWdlIiwicmVxdWVzdCIsInNlbmRlciIsInNlbmRSZXNwb25zZSIsImV2ZW50IiwicmVtaW5kZXIiLCJzdGF0dXMiLCJjbGVhciIsIm1lc3NhZ2UiLCJub3RpZmljYXRpb25zIiwidGl0bGUiLCJ0eXBlIiwiaWNvblVybCIsInByaW9yaXR5Il0sInNvdXJjZVJvb3QiOiIifQ==