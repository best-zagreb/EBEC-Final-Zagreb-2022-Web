document.addEventListener("DOMContentLoaded", async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("sw.js", {
        scope: "/",
      });
      console.log("Service Worker registered with scope:", registration.scope);

      if ("PeriodicSyncManager" in window) {
        try {
          await registration.periodicSync.register("background-sync", {
            minInterval: 10 * 1000, // 10s
          });
          console.log("Background sync registered");
        } catch (err) {
          console.error("Background sync failed:", err);
        }
      } else {
        console.log("Periodic Background Sync is not supported");
      }

      if ("Notification" in window) {
        if (Notification.permission === "default") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              console.log("Notification permission granted");
            } else {
              console.warn("Notification permission denied");
            }
          });
        }
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  } else {
    console.warn("Service Worker is not supported in this browser.");
  }
});
