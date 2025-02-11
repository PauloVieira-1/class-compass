chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: "index.html",
  });
});

/**
 * @param {Date} date -
 */
const createAlarm = (date, time, name) => {
  const dateTime = new Date(`${date}T${time}:00`).getTime();

  chrome.alarms.create(
    name.split(" ").join("_"),
    {
      when: dateTime,
    },
    () => {},
  );
};

/**
 * @param {string} alarm
 */

chrome.alarms.onAlarm.addListener((alarm) => {
  createNotification(alarm.name.split("_").join(" "));
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message:", request);

  if (request.event === "sendDate") {
    createAlarm(request.date, request.time, request.reminder);
    sendResponse({ status: "Notification triggered" });
  } else if (request.event === "removeDate") {
    chrome.alarms.clear(request.reminder.split(" ").join("_"));
    sendResponse({ status: "Notification removed" });
  }
});

/**
 *
 * @param {String} message
 */

const createNotification = (message) => {
  chrome.notifications.create(
    `Notification_${message}`,
    {
      title: "Class Compass",
      message,
      type: "basic",
      iconUrl: "Logo1.png",
      priority: 2,
    },
    () => {
      console.log("Notification created");
    },
  );
};
