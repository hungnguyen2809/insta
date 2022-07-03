import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { logger } from 'src/utils';
import notifiService from './NotificationService';

class FCMService {
  private messageListener: (() => void) | undefined = undefined;

  onRegister = (onRegister: Function, onNotification: Function, onOpenNotification: Function) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
  };

  onRegisterAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      if (messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister: Function) => {
    messaging()
      .hasPermission()
      .then(status => {
        if (
          status === messaging.AuthorizationStatus.AUTHORIZED ||
          status === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        logger.log('[FCMService] Permission rejected', error);
      });
  };

  getToken = (onRegister: Function) => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken, false);
        } else {
          logger.log('[FCMService] User does not have a decive token ');
        }
      })
      .catch(error => {
        logger.log('[FCMService] getToken rejected', error);
      });
  };

  requestPermission = (onRegister: Function) => {
    messaging()
      .requestPermission()
      .then(status => {
        if (
          status === messaging.AuthorizationStatus.AUTHORIZED ||
          status === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          this.getToken(onRegister);
        }
      })
      .catch(error => {
        logger.log('[FCMService] Request Permission rejected', error);
      });
  };

  deleteToken = () => {
    messaging()
      .deleteToken()
      .then(() => {
        logger.log('[FCMService] Delete Token');
      })
      .catch(error => {
        logger.log('[FCMService] Delete Token rejected', error);
      });
  };

  createNotificationListeners = (
    onRegister: Function,
    onNotification: Function,
    onOpenNotification: Function,
  ) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        const notification = remoteMessage;
        onOpenNotification(notification);
      }
    });

    //When the application is opened from a quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const notification = remoteMessage;
          notifiService.cancelAllLocalNotifications();
          onOpenNotification(notification);
        }
      });

    //When app revive notification form firebase messaging
    this.messageListener = messaging().onMessage(async remoteMessage => {
      // logger.log('[FCMService] onMessage: ', remoteMessage);
      if (remoteMessage) {
        let notification = null;

        if (Platform.OS === 'ios') {
          notification = remoteMessage.data;
        } else {
          notification = remoteMessage;
        }

        onNotification(notification);
      }
    });

    messaging().onTokenRefresh(fcmToken => {
      // logger.log('[FCMService] onTokenRefresh: ', fcmToken);
      if (fcmToken) {
        onRegister(fcmToken, true);
      }
    });
  };

  unregister = () => {
    if (typeof this.messageListener === 'function') {
      this.messageListener();
    }
  };

  // stopAlarmRing = async () => {
  //   if (Platform.OS !== 'ios') {
  //     await messaging().stopAlarmRing();
  //   }
  // };
}

const fcmService = new FCMService();
export default fcmService;
