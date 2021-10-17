import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
import PushNotification, {
  PushNotificationObject,
  ReceivedNotification,
} from 'react-native-push-notification';

export type TokenRegisterNotification = {
  os: string;
  token: string;
};

export type NotificationReceived = Omit<ReceivedNotification, 'userInfo'>;

export interface OpenNotificationReceived extends NotificationReceived {
  [key: string]: any;
}

class NotificationHandler {
  private _onRegister: (token: TokenRegisterNotification) => void = () => {};
  private _onNotification: (noti: NotificationReceived) => void = () => {};
  private _onOpenNotification: (noti: OpenNotificationReceived) => void = () => {};

  onNotification(notification: NotificationReceived) {
    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);

      // when user click into notification
      if (
        notification.foreground &&
        notification.userInteraction &&
        typeof this._onOpenNotification === 'function'
      ) {
        this._onOpenNotification(notification);
      }
    }

    if (Platform.OS === 'ios') {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  }

  onRegister(token: TokenRegisterNotification) {
    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
    }
  }

  onAction(notification: ReceivedNotification) {
    console.log('[onAction] Notification action received:', {
      notification,
      action: notification.action,
    });

    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification as PushNotificationObject);
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err: any) {
    console.log('Error Noti: ', err);
  }

  attachRegister(handler: (token: TokenRegisterNotification) => void) {
    this._onRegister = handler;
  }

  attachNotification(handler: (noti: NotificationReceived) => void) {
    this._onNotification = handler;
  }

  attachOpenNotification(handler: (noti: OpenNotificationReceived) => void) {
    this._onOpenNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: handler.onRegister.bind(handler),

  // (required) Called when a remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),

  // (optional) Called when Action is pressed (Android)
  onAction: handler.onAction.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: handler.onRegistrationError.bind(handler),

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export default handler;
