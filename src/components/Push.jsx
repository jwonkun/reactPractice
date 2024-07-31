import React, { useEffect, useState } from 'react';

const publicVapidKey = 'BLGNdiz-fkNUMQOQbE3S6NOUxV5eoLVohty3hc8qrdtV4X5jZQrpFkbI_9pJvGBaczSHAPJNJOTnSSZGsH9ZNL0';

const Push = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(error => {
        console.error('Service Worker registration failed:', error);
      });
    }

    // 웹소켓 설정
    const socket = new WebSocket('ws://127.1.30.69:5566');

    socket.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    socket.addEventListener('message', event => {
      const notification = JSON.parse(event.data);
      console.log('Received notification:', notification);

      setNotifications(prevNotifications => [
        ...prevNotifications,
        notification
      ]);

      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
        });
      }
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    return () => {
      socket.close();
    };
  }, []);

  const subscribeUserToPush = () => {
    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      }).then(subscription => {
        console.log('User is subscribed:', subscription);

        fetch('http://172.1.30.69:5566/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ subscription })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Subscription sent to server:', data);
        })
        .catch(error => {
          console.error('Error sending subscription to server:', error);
        });
      }).catch(error => {
        console.error('Failed to subscribe the user:', error);
      });
    });
  };

  const handleSubscribe = () => {
    if ('Notification' in window && navigator.serviceWorker) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          subscribeUserToPush();
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  };

  const handleSendTestNotification = () => {
    fetch('http://127.1.30.69:5566/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Test Notification',
        message: 'This is a test notification sent from the server!'
      })
    }).then(response => response.json())
      .then(data => {
        console.log('Test notification sent:', data);
      })
      .catch(error => {
        console.error('Error sending test notification:', error);
      });
  };

  const handleFetchNotifications = () => {
    fetch('http://127.0.0.1:5566/notifications')
      .then(response => response.json())
      .then(data => {
        setNotifications(data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return (
    <div>
      <button onClick={handleSubscribe}>Subscribe</button>
      <button onClick={handleSendTestNotification}>Send Test Notification</button>
      <button onClick={handleFetchNotifications}>Fetch Notifications</button>
      <div id="notifications">
        {notifications.map((notification, index) => (
          <div key={index}>
            Title: {notification.title}, Message: {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Push;
