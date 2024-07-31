self.addEventListener('push', (event) => {
    const data = event.data?.json() ?? {};
    const title = data.title || "Something Has Happened";
    const message = data.message || "Here's something you might want to check out.";
    const icon = "images/new-notification.png";
  
    const notificationOptions = {
      body: message,
      icon: icon,
      tag: "simple-push-demo-notification"
    };
  
    event.waitUntil(
      self.registration.showNotification(title, notificationOptions)
    );
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('https://example.blog.com/2015/03/04/something-new.html')
    );
  });
  