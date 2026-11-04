
// Mission Control V2 — Push Notification Service Worker

self.addEventListener("push", function (event) {
  let message = {
    title: "Mission Control",
    body: "You have a mission reminder."
  };

  if (event.data) {
    try {
      message = { ...message, ...event.data.json() };
    } catch (error) {
      message.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(message.title, {
      body: message.body,
      icon: "./icon-192.png",
      badge: "./icon-192.png",
tag: message.tag || (
  message.reminderType === "end"
    ? "mission-end-" + message.missionId
    : "mission-reminder"
),
      data: {
  url: "./",
  missionId: message.missionId || null,
  reminderType: message.reminderType || null
}
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const data = event.notification.data || {};

  const url = data.missionId
    ? "./?finishMission=" + encodeURIComponent(data.missionId)
    : (data.url || "./");

  event.waitUntil(
    clients.openWindow(url)
  );
});
