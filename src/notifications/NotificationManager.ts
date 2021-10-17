import {
  NotificationReceived,
  OpenNotificationReceived,
  TokenRegisterNotification,
} from './NotificationHandler';
import NotificationService from './NotificationService';

class NotificationManager extends NotificationService {
  constructor() {
    super(
      token => this.onRegister(token),
      noti => this.onNotification(noti),
      noti => this.onOpenNotification(noti),
    );
  }

  private onRegister = (_token: TokenRegisterNotification) => {
    console.log('[NotificationManager] onRegister: ', _token);
  };

  private onNotification = (_notification: NotificationReceived) => {
    console.log('[NotificationManager] onNotification: ', _notification);
  };

  onOpenNotification = (notification: OpenNotificationReceived) => {
    console.log('[NotificationManager] onOpenNotification: ', notification);
  };
}

const NotifiManager = new NotificationManager();
export default NotifiManager;
