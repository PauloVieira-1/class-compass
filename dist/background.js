/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ // The require scope
  /******/ var __webpack_require__ = {};
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  /*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
  __webpack_require__.r(__webpack_exports__);
  chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.create({
      url: "index.html",
    });
  });

  /**
   * @param {Date} date -
   */
  var createAlarm = function createAlarm(date, time, name) {
    var dateTime = new Date("".concat(date, "T").concat(time, ":00")).getTime();
    chrome.alarms.create(
      name.split(" ").join("_"),
      {
        when: dateTime,
      },
      function () {},
    );
  };

  /**
   * @param {string} alarm
   */

  chrome.alarms.onAlarm.addListener(function (alarm) {
    createNotification(alarm.name.split("_").join(" "));
  });
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log("Received message:", request);
      if (request.event === "sendDate") {
        createAlarm(request.date, request.time, request.reminder);
        sendResponse({
          status: "Notification triggered",
        });
      } else if (request.event === "removeDate") {
        chrome.alarms.clear(request.reminder.split(" ").join("_"));
        sendResponse({
          status: "Notification removed",
        });
      }
    },
  );

  /**
   *
   * @param {String} message
   */

  var createNotification = function createNotification(message) {
    chrome.notifications.create(
      "Notification_".concat(message),
      {
        title: "Class Compass",
        message: message,
        type: "basic",
        iconUrl: "Logo1.png",
        priority: 2,
      },
      function () {
        console.log("Notification created");
      },
    );
  };
  /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNocm9tZS5hY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKCh0YWIpID0+IHtcbiAgY2hyb21lLnRhYnMuY3JlYXRlKHtcbiAgICB1cmw6IFwiaW5kZXguaHRtbFwiLFxuICB9KTtcbn0pO1xuXG4vKipcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtXG4gKi9cbmNvbnN0IGNyZWF0ZUFsYXJtID0gKGRhdGUsIHRpbWUsIG5hbWUpID0+IHtcbiAgY29uc3QgZGF0ZVRpbWUgPSBuZXcgRGF0ZShgJHtkYXRlfVQke3RpbWV9OjAwYCkuZ2V0VGltZSgpO1xuXG4gIGNocm9tZS5hbGFybXMuY3JlYXRlKFxuICAgIG5hbWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJfXCIpLFxuICAgIHtcbiAgICAgIHdoZW46IGRhdGVUaW1lLFxuICAgIH0sXG4gICAgKCkgPT4ge30sXG4gICk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBhbGFybVxuICovXG5cbmNocm9tZS5hbGFybXMub25BbGFybS5hZGRMaXN0ZW5lcigoYWxhcm0pID0+IHtcbiAgY3JlYXRlTm90aWZpY2F0aW9uKGFsYXJtLm5hbWUuc3BsaXQoXCJfXCIpLmpvaW4oXCIgXCIpKTtcbn0pO1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiUmVjZWl2ZWQgbWVzc2FnZTpcIiwgcmVxdWVzdCk7XG5cbiAgaWYgKHJlcXVlc3QuZXZlbnQgPT09IFwic2VuZERhdGVcIikge1xuICAgIGNyZWF0ZUFsYXJtKHJlcXVlc3QuZGF0ZSwgcmVxdWVzdC50aW1lLCByZXF1ZXN0LnJlbWluZGVyKTtcbiAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6IFwiTm90aWZpY2F0aW9uIHRyaWdnZXJlZFwiIH0pO1xuICB9IGVsc2UgaWYgKHJlcXVlc3QuZXZlbnQgPT09IFwicmVtb3ZlRGF0ZVwiKSB7XG4gICAgY2hyb21lLmFsYXJtcy5jbGVhcihyZXF1ZXN0LnJlbWluZGVyLnNwbGl0KFwiIFwiKS5qb2luKFwiX1wiKSk7XG4gICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiBcIk5vdGlmaWNhdGlvbiByZW1vdmVkXCIgfSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICovXG5cbmNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbiA9IChtZXNzYWdlKSA9PiB7XG4gIGNocm9tZS5ub3RpZmljYXRpb25zLmNyZWF0ZShcbiAgICBgTm90aWZpY2F0aW9uXyR7bWVzc2FnZX1gLFxuICAgIHtcbiAgICAgIHRpdGxlOiBcIkNsYXNzIENvbXBhc3NcIixcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB0eXBlOiBcImJhc2ljXCIsXG4gICAgICBpY29uVXJsOiBcIkxvZ28xLnBuZ1wiLFxuICAgICAgcHJpb3JpdHk6IDIsXG4gICAgfSxcbiAgICAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vdGlmaWNhdGlvbiBjcmVhdGVkXCIpO1xuICAgIH0sXG4gICk7XG59O1xuIl0sIm5hbWVzIjpbImNocm9tZSIsImFjdGlvbiIsIm9uQ2xpY2tlZCIsImFkZExpc3RlbmVyIiwidGFiIiwidGFicyIsImNyZWF0ZSIsInVybCIsImNyZWF0ZUFsYXJtIiwiZGF0ZSIsInRpbWUiLCJuYW1lIiwiZGF0ZVRpbWUiLCJEYXRlIiwiY29uY2F0IiwiZ2V0VGltZSIsImFsYXJtcyIsInNwbGl0Iiwiam9pbiIsIndoZW4iLCJvbkFsYXJtIiwiYWxhcm0iLCJjcmVhdGVOb3RpZmljYXRpb24iLCJydW50aW1lIiwib25NZXNzYWdlIiwicmVxdWVzdCIsInNlbmRlciIsInNlbmRSZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJldmVudCIsInJlbWluZGVyIiwic3RhdHVzIiwiY2xlYXIiLCJtZXNzYWdlIiwibm90aWZpY2F0aW9ucyIsInRpdGxlIiwidHlwZSIsImljb25VcmwiLCJwcmlvcml0eSJdLCJzb3VyY2VSb290IjoiIn0=
