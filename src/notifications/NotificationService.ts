import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
import PushNotification, {
  ChannelObject,
  Importance,
  PushNotificationDeliveredObject,
  PushNotificationObject,
  PushNotificationPermissions,
  PushNotificationScheduledLocalObject,
  PushNotificationScheduleObject,
  ReceivedNotification,
} from 'react-native-push-notification';
import NotificationHandler, {
  NotificationReceived,
  OpenNotificationReceived,
  TokenRegisterNotification,
} from './NotificationHandler';

export default class NotificationService {
  private lastId: number;
  private lastChannelCounter: number;
  private channelIdDefault = 'default-channel-id';

  constructor(
    onRegister: (token: TokenRegisterNotification) => void,
    onNotification: (noti: NotificationReceived) => void,
    onOpenNotification: (noti: OpenNotificationReceived) => void,
  ) {
    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);
    NotificationHandler.attachOpenNotification(onOpenNotification);

    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();
    this.clearIconBadgeNumber();
  }

  createDefaultChannels = () => {
    PushNotification.createChannel(
      {
        channelId: this.channelIdDefault, // (required)
        channelName: 'Default channel', // (required)
        channelDescription: 'Default channel', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (_created: boolean) => {
        // (optional) callback returns whether the channel was created, false means it already existed.
        // console.log(`createChannel 'default-channel-id' returned '${_created}'`);
      },
    );
  };

  createOrUpdateChannel = (channel: ChannelObject, callback: (created: boolean) => void) => {
    this.lastChannelCounter++;
    PushNotification.createChannel(channel, callback);
  };

  getLastChannelIdCounter = () => {
    return this.lastChannelCounter;
  };

  getChannels = (callback: (channel_ids: string[]) => void) => {
    PushNotification.getChannels(channels => {
      callback(channels);
    });
  };

  popInitialNotification = (callback: (notification: ReceivedNotification | null) => void) => {
    PushNotification.popInitialNotification(callback);
  };

  showNotification = (
    title: string,
    message: string,
    data = {},
    options?: PushNotificationObject,
  ) => {
    this.lastId++;
    PushNotification.localNotification({
      //other options
      ...options,
      /* Android Only Properties */
      channelId: this.channelIdDefault,
      autoCancel: true,
      largeIcon: options?.largeIcon || 'ic_launcher',
      smallIcon: options?.smallIcon || 'ic_launcher',
      bigText: message || '',
      subText: title || '',
      vibrate: options?.vibrate || false,
      vibration: options?.vibration || 300,
      // actions: ['Yes', 'No'],
      invokeApp: true,
      importance: options?.importance || 'high',
      visibility: options?.visibility || 'private',
      allowWhileIdle: true,
      // userInteraction: false,

      /* iOS only properties */
      category: options?.category || '',
      // subtitle: options?.subTitleIOS || '',

      /* iOS and Android properties */
      id: this.lastId,
      title: title,
      message: message,
      userInfo: data,
      playSound: options?.playSound || true,
      soundName: options?.soundName || 'default',
    });
  };

  scheduleNotification = (
    title: string,
    message: string,
    time = 5,
    data = {},
    options?: PushNotificationScheduleObject,
  ) => {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + time * 1000), // in 'time' secs

      //other options
      ...options,
      /* Android Only Properties */
      channelId: this.channelIdDefault,
      autoCancel: true,
      largeIcon: options?.largeIcon || 'ic_launcher',
      smallIcon: options?.smallIcon || 'ic_notification',
      bigText: message || '',
      subText: title || '',
      color: options?.color || 'red',
      vibrate: options?.vibrate || false,
      vibration: options?.vibration || 300,
      actions: ['Yes', 'No'],
      invokeApp: true,
      importance: options?.importance || 'high',
      visibility: options?.visibility || 'private',

      /* iOS only properties */
      category: options?.category || '',

      /* iOS and Android properties */
      id: this.lastId,
      title: title,
      message: message,
      userInfo: data,
      playSound: options?.playSound || true,
      soundName: options?.soundName || 'default',
    });
  };

  checkPermission = (callback: (permissions: PushNotificationPermissions) => void) => {
    return PushNotification.checkPermissions(callback);
  };

  requestPermissions = (permissions?: ('alert' | 'badge' | 'sound')[]) => {
    return PushNotification.requestPermissions(permissions);
  };

  cancelNotificationById(notificationId?: string) {
    const notiID = notificationId ? notificationId : `${this.lastId}`;
    PushNotification.cancelLocalNotification(notiID);
  }

  cancelAllLocalNotificaions = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
    this.clearIconBadgeNumber();
  };

  clearIconBadgeNumber = () => {
    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(number => {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  };

  abandonPermissions = () => {
    PushNotification.abandonPermissions();
  };

  getScheduledLocalNotifications = (
    callback: (notifications: PushNotificationScheduledLocalObject[]) => void,
  ) => {
    PushNotification.getScheduledLocalNotifications(callback);
  };

  getDeliveredNotifications = (
    callback: (notifications: PushNotificationDeliveredObject[]) => void,
  ) => {
    PushNotification.getDeliveredNotifications(callback);
  };

  unRegister = () => {
    PushNotification.unregister();
  };

  unsubscribeFromTopic = (topic: string) => {
    PushNotification.unsubscribeFromTopic(topic);
  };
}
