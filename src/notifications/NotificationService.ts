import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
import PushNotification, {
  ChannelObject,
  Importance,
  PushNotificationObject,
} from 'react-native-push-notification';
import { logger } from 'src/utils';

interface NotificationOptions extends PushNotificationObject {
  [key: string]: any;
}

class NotificationService {
  private lastId: number = 0;
  private channelIdDefault: string = 'channel-id-default';

  constructor() {
    this.createDefaultChannels();
    this.clearIconBadgeNumber();
  }

  configure(onOpenNotification: Function, onAction: Function) {
    PushNotification.configure({
      onAction: notification => {
        if (typeof onAction === 'function') {
          onAction(notification);
        }
      },
      onNotification: notification => {
        if (!notification.data) {
          return;
        }

        if (
          notification.foreground &&
          notification.userInteraction &&
          typeof onOpenNotification === 'function'
        ) {
          onOpenNotification(notification);
        }

        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      onRegistrationError: error => {
        logger.log('[onRegistrationError]: ', error);
      },
      requestPermissions: true,
      popInitialNotification: true,
      permissions: { alert: true, badge: true, sound: true },
    });
  }

  unregister() {
    PushNotification.unregister();
  }

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: this.channelIdDefault,
        channelName: 'Default channel',
        channelDescription: 'Default channel',
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      created => {
        logger.log('createDefaultChannels: ', created);
      },
    );
  }

  createOrUpdateChannel = (channel: ChannelObject, callback: (created: boolean) => void) => {
    PushNotification.createChannel(channel, callback);
  };

  getChannels = (callback: (channel_ids: string[]) => void) => {
    PushNotification.getChannels(channels => {
      callback(channels);
    });
  };

  showNotification(
    title: string,
    message: string,
    data = {},
    options?: Partial<NotificationOptions>,
  ) {
    this.lastId++;
    PushNotification.localNotification({
      //Both
      id: this.lastId,
      title: title || 'Thông báo',
      message: message || '',
      data: data,
      userInfo: data,
      playSound: options?.playSound || true,
      soundName: options?.soundName || 'default',
      badge: true,
      userInteraction: false, //xử lý việc người dùng có action nhấn từ thông báo hay là tự động
      //Android
      subText: title || '',
      bigText: message || '',
      channelId: this.channelIdDefault,
      largeIcon: options?.largeIcon || 'ic_launcher',
      smallIcon: options?.smallIcon || 'ic_launcher',
      vibrate: options?.vibrate || true,
      vibration: options?.vibration || 300,
      priority: options?.priority || 'high',
      importance: options?.importance || 'high',
      //IOS
      category: options?.category || '',
      subtitle: options?.subtitle || '',
    } as NotificationOptions);

    return this.lastId;
  }

  // Clear badge number when start open app
  clearIconBadgeNumber = () => {
    PushNotification.getApplicationIconBadgeNumber(number => {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  };

  cancelAllLocalNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
    this.clearIconBadgeNumber();
  };

  cancelLocalNotification(notificationId?: string) {
    const notiID = notificationId ? notificationId : `${this.lastId}`;
    PushNotification.cancelLocalNotification(notiID);
  }
}

const notifiService = new NotificationService();
export default notifiService;
