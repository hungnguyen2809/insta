import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {
  private unMessageListener: () => void = () => {};

  register = (onRegister: Function, onNotification: Function, onOpenNotification: Function) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      // await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister: Function) => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permission
          this.getToken(onRegister);
        } else {
          // user don't have permison
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        console.log('[FCMService] Permission rejected', error);
      });
  };

  getToken = (onRegister: Function) => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a decive token ');
        }
      })
      .catch(error => {
        console.log('[FCMService] getToken rejected', error);
      });
  };

  requestPermission = (onRegister: Function) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
        console.log('[FCMService] Request Permission rejected', error);
      });
  };

  deleteToken = () => {
    console.log('[FCMService] Delete Token');
    messaging()
      .deleteToken()
      .catch(error => {
        console.log('[FCMService] Delete Token rejected', error);
      });
  };

  createNotificationListeners = (
    onRegister: Function,
    onNotification: Function,
    onOpenNotification: Function,
  ) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp(remoteMessage => {
      // console.log('[FCMService] onNotificationOpenedApp: ', remoteMessage);
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });

    //When the application is opened from a quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        // console.log('[FCMService] getInitialNotification: ', remoteMessage);
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      });

    this.unMessageListener = messaging().onMessage(async remoteMessage => {
      console.log('[FCMService] onMessage: ', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data?.notification;
        } else {
          notification = remoteMessage.notification;
        }

        onNotification(notification);
      }
    });

    // Trigger when have new toke
    messaging().onTokenRefresh(fcmToken => {
      console.log('[FCMService] onTokenRefresh: ', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    if (typeof this.unMessageListener === 'function') {
      this.unMessageListener();
    }
  };
}

const fcmService = new FCMService();
export default fcmService;
